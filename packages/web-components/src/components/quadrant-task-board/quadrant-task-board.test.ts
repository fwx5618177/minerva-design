// <minerva-quadrant-task-board> against a fake chart engine: the dialogs,
// the toolbar of the active task and the drops produce the next points
// (`minerva-points-change`), the board never changing its own `points`.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  quadrantCenter,
  quadrantOf,
  type QuadrantPoint,
} from "minerva-design/charts/core";
import type { MinervaButton } from "../button/button";
import type { MinervaQuadrantChart } from "../chart/charts";
import type { MinervaConfirmDialog } from "../confirm/confirm";
import type { MinervaInput } from "../input/input";
import type { MinervaModal } from "../modal/modal";
import type { MinervaSelect } from "../select/select";
import type { MinervaQuadrantTaskBoard } from "./quadrant-task-board";

type Listener = (event: unknown) => void;
interface FakeEngine {
  fire(type: string, event: unknown): void;
}
const engines: FakeEngine[] = [];

vi.mock("minerva-design/charts/core", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("minerva-design/charts/core")>();
  return {
    ...actual,
    createChart: () => {
      const listeners = new Map<string, Set<Listener>>();
      engines.push({
        fire: (type, event) =>
          listeners.get(type)?.forEach((listener) => listener(event)),
      });
      return new Proxy(
        {
          on: (type: string, listener: Listener) => {
            if (!listeners.has(type)) listeners.set(type, new Set());
            listeners.get(type)!.add(listener);
            return () => listeners.get(type)!.delete(listener);
          },
        } as Record<string, unknown>,
        { get: (target, key: string) => target[key] ?? (() => undefined) },
      );
    },
  };
});

await import("../../elements/quadrant-task-board");
const { $, mount, settle } = await import("../../../tests/utils");

const TASKS: QuadrantPoint[] = [
  { x: 2, y: 8, label: "Fix login", color: "red", size: 14 },
  { x: 8, y: 2, label: "Inbox zero" },
];

beforeEach(() => {
  engines.length = 0;
});
afterEach(() => {
  document.body.innerHTML = "";
});

const setup = async (points: QuadrantPoint[] = TASKS) => {
  const board = await mount<MinervaQuadrantTaskBoard>(
    `<minerva-quadrant-task-board></minerva-quadrant-task-board>`,
  );
  board.points = points;
  await settle();
  const engine = engines[engines.length - 1];
  // the plot is known once the engine laid it out: the slots are placed
  engine.fire("layout", { x: 40, y: 20, width: 400, height: 300 });
  await settle();
  const changes: QuadrantPoint[][] = [];
  board.addEventListener("minerva-points-change", (event) =>
    changes.push(
      (event as CustomEvent<{ points: QuadrantPoint[] }>).detail.points,
    ),
  );
  const find = <E extends Element = HTMLElement>(selector: string) =>
    $<E>(board, selector);
  const chart = find<MinervaQuadrantChart>("minerva-quadrant-chart");
  const modal = find<MinervaModal>("minerva-modal");
  const confirm = find<MinervaConfirmDialog>("minerva-confirm-dialog");
  const nameInput = find<MinervaInput>("minerva-input");
  return {
    board,
    engine,
    changes,
    find,
    chart,
    modal,
    confirm,
    nameInput,
    /** Types a task name in the dialog (through the native input) */
    type: async (text: string) => {
      const native = $<HTMLInputElement>(nameInput, "input");
      native.value = text;
      native.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      );
      await settle();
    },
    /** Clicks the native button of a <minerva-button> */
    press: async (button: MinervaButton) => {
      $<HTMLButtonElement>(button, "button").click();
      await settle();
    },
    footer: () =>
      Array.from(
        board.shadowRoot!.querySelectorAll<MinervaButton>(
          ".footer minerva-button",
        ),
      ),
  };
};

/** Selects a task by clicking its dot */
const clickPoint = async (engine: FakeEngine, index: number) => {
  engine.fire("click", { x: 0, xLabel: "", items: [{ index }] });
  await settle();
};

describe("minerva-quadrant-task-board", () => {
  it("renders a header per quadrant with its title, count and add button", async () => {
    const { board, chart } = await setup();
    const headers = Array.from(
      board.shadowRoot!.querySelectorAll<HTMLElement>(".header"),
    );
    expect(headers.map((h) => h.dataset.corner)).toEqual([
      "topLeft",
      "topRight",
      "bottomLeft",
      "bottomRight",
    ]);
    expect(headers.map((h) => h.querySelector(".count")?.textContent)).toEqual([
      "1",
      "0",
      "0",
      "1",
    ]);
    const add = headers[0].querySelector("minerva-icon-button")!;
    expect(add.getAttribute("label")).toBe("Add task · Top left quadrant");
    // slotted into the overlay of the chart
    expect(headers[0].slot).toBe("quadrant-header-top-left");
    expect(
      chart
        .shadowRoot!.querySelector(
          "[part=quadrant-header][data-corner=topLeft] slot",
        )
        ?.getAttribute("name"),
    ).toBe("quadrant-header-top-left");
    expect(chart.dragPoints).toBe(true);
  });

  it("add: Cancel leaves the points; Save fires them with the new task appended", async () => {
    const { board, find, modal, changes, type, press, footer } = await setup();
    find("[data-corner=topRight] minerva-icon-button").click();
    await settle();
    expect(modal.open).toBe(true);
    expect(modal.label).toBe("Add task");
    await type("Plan sprint");
    await press(footer()[0]);
    expect(modal.open).toBe(false);
    expect(changes).toEqual([]);

    find("[data-corner=topRight] minerva-icon-button").click();
    await settle();
    expect(footer()[1].disabled).toBe(true);
    await type("  Plan sprint ");
    expect(footer()[1].disabled).toBe(false);
    await press(footer()[1]);
    const center = quadrantCenter({}, "topRight");
    expect(changes).toEqual([
      [...TASKS, { x: center.x, y: center.y, label: "Plan sprint" }],
    ]);
    expect(modal.open).toBe(false);
    // controlled: the board did not change its own points
    expect(board.points).toBe(TASKS);
  });

  it("a click on an empty area adds a task there; Enter in the name saves", async () => {
    const { engine, modal, changes, type, nameInput } = await setup();
    engine.fire("plotClick", { x: 7, y: 9 });
    await settle();
    expect(modal.open).toBe(true);
    await type("Ship it");
    $<HTMLInputElement>(nameInput, "input").dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
        composed: true,
      }),
    );
    await settle();
    expect(changes).toEqual([[...TASKS, { x: 7, y: 9, label: "Ship it" }]]);
  });

  it("edit: renames the active task and keeps its other fields", async () => {
    const {
      engine,
      find,
      modal,
      changes,
      type,
      press,
      footer,
      nameInput,
      chart,
    } = await setup();
    await clickPoint(engine, 0);
    const toolbar = find(".actions");
    expect(toolbar.getAttribute("role")).toBe("toolbar");
    const anchor = chart.shadowRoot!.querySelector<HTMLElement>(
      "[part=point-actions]",
    );
    expect(anchor?.dataset.pointIndex).toBe("0");
    find("[data-action=edit]").click();
    await settle();
    expect(modal.open).toBe(true);
    expect(modal.label).toBe("Edit task");
    expect(nameInput.value).toBe("Fix login");
    await type("Fix login page");
    await press(footer()[1]);
    expect(changes).toEqual([
      [{ ...TASKS[0], label: "Fix login page" }, TASKS[1]],
    ]);
  });

  it("edit: picking another quadrant moves the task to its center", async () => {
    const { engine, find, changes, press, footer } = await setup();
    // a double click opens the edit dialog too
    await clickPoint(engine, 0);
    await clickPoint(engine, 0);
    const select = find<MinervaSelect>("minerva-select");
    expect(select.value).toBe("topLeft");
    select.dispatchEvent(
      new CustomEvent("minerva-change", {
        detail: { value: "bottomRight" },
        bubbles: true,
        composed: true,
      }),
    );
    await settle();
    await press(footer()[1]);
    const center = quadrantCenter({}, "bottomRight");
    expect(changes).toEqual([
      [{ ...TASKS[0], x: center.x, y: center.y }, TASKS[1]],
    ]);
  });

  it("delete: asks first; Cancel keeps the task, the confirm button removes it", async () => {
    const { board, engine, find, confirm, changes, press } = await setup();
    await clickPoint(engine, 1);
    find("[data-action=delete]").click();
    await settle();
    expect(confirm.open).toBe(true);
    expect(confirm.label).toBe("Delete task");
    expect(confirm.description).toBe(
      "“Inbox zero” will be removed from the board.",
    );
    await press($<MinervaButton>(confirm, "[part=cancel-button]"));
    expect(confirm.open).toBe(false);
    expect(changes).toEqual([]);

    find("[data-action=delete]").click();
    await settle();
    await press($<MinervaButton>(confirm, "[part=confirm-button]"));
    expect(changes).toEqual([[TASKS[0]]]);
    expect(confirm.open).toBe(false);
    expect(board.points).toBe(TASKS);
  });

  it("drop: fires the points with the new x / y of the dropped task", async () => {
    const { board, engine, chart, changes } = await setup();
    const drops = vi.fn();
    board.addEventListener("minerva-point-drop", drops);
    engine.fire("drop", { item: { index: 0 }, x: 7.5, y: 1.5 });
    await settle();
    expect(changes).toEqual([[{ ...TASKS[0], x: 7.5, y: 1.5 }, TASKS[1]]]);
    expect(quadrantOf({}, 7.5, 1.5)).toBe("bottomRight");
    // consumed by the board; the dropped task becomes the selected one
    expect(drops).not.toHaveBeenCalled();
    expect(chart.selectedIndex).toBe(0);
  });

  it("localizes its texts and applies `labels` overrides", async () => {
    const { board, find } = await setup();
    board.locale = "fr";
    board.labels = { add: "Nouvelle" };
    await settle();
    expect(
      find("[data-corner=topLeft] minerva-icon-button").getAttribute("label"),
    ).toMatch(/^Nouvelle · /);
    expect(find(".actions").getAttribute("aria-label")).toBe(
      "Actions de la tâche",
    );
  });

  it("leaves its host attributes alone and redraws after a reconnection", async () => {
    const { board, engine, changes } = await setup();
    expect(board.getAttributeNames()).toEqual([]);
    const parent = board.parentElement!;
    board.remove();
    parent.append(board);
    await settle();
    const next = engines[engines.length - 1];
    expect(next).not.toBe(engine);
    next.fire("drop", { item: { index: 1 }, x: 1, y: 1 });
    await settle();
    expect(changes).toEqual([[TASKS[0], { ...TASKS[1], x: 1, y: 1 }]]);
  });
});
