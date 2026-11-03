// <minerva-quadrant-task-board> against a fake chart engine: the inline
// panel, the toolbar of the active task and the drops produce the next
// points (`minerva-points-change`), the board never changing its own
// `points`.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  quadrantCenter,
  quadrantOf,
  type QuadrantPoint,
} from "minerva-design/charts/core";
import type { MinervaButton } from "../button/button";
import type { MinervaQuadrantChart } from "../chart/charts";
import type { MinervaInput } from "../input/input";
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

/** The focused element, looking into the shadow roots */
const deepActive = () => {
  let active = document.activeElement;
  while (active?.shadowRoot?.activeElement)
    active = active.shadowRoot.activeElement;
  return active;
};

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
  const root = board.shadowRoot!;
  const find = <E extends Element = HTMLElement>(selector: string) =>
    $<E>(board, selector);
  const chart = find<MinervaQuadrantChart>("minerva-quadrant-chart");
  /** The inline panel (`null`: closed) */
  const panel = () => root.querySelector<HTMLElement>("[part=panel]");
  const nameInput = () => root.querySelector<MinervaInput>("minerva-input")!;
  return {
    board,
    engine,
    changes,
    find,
    chart,
    panel,
    nameInput,
    /** Types a task name in the panel (through the native input) */
    type: async (text: string) => {
      const native = $<HTMLInputElement>(nameInput(), "input");
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
        root.querySelectorAll<MinervaButton>(
          "[part=panel] .footer minerva-button",
        ),
      ),
    /** Clicks the add button of a quadrant */
    add: async (corner: string) => {
      find(`.header[data-corner=${corner}] minerva-icon-button`).click();
      await settle();
    },
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
    expect(add.getAttribute("aria-expanded")).toBe("false");
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

  it("add: an inline panel in the board; Cancel leaves the points, Save fires them with the new task", async () => {
    const { board, find, panel, nameInput, changes, type, press, footer, add } =
      await setup();
    await add("topRight");
    const dialog = panel()!;
    // inline in the board's shadow root, not a modal
    expect(dialog.parentElement).toBe(find("[part=root]"));
    expect(find("[part=root]").dataset.panel).toBe("draft");
    expect(dialog.getAttribute("role")).toBe("dialog");
    expect(dialog.dataset.quadrantTaskPanel).toBe("add");
    const title = board.shadowRoot!.getElementById(
      dialog.getAttribute("aria-labelledby")!,
    );
    expect(title?.textContent?.trim()).toBe("Add task");
    // placed next to its anchor
    expect(dialog.style.left).toMatch(/px$/);
    expect(dialog.style.top).toMatch(/px$/);
    expect(dialog.dataset.placement).toMatch(/^(top|bottom)$/);
    expect(
      find(".header[data-corner=topRight] minerva-icon-button").getAttribute(
        "aria-expanded",
      ),
    ).toBe("true");
    // the name field takes the focus
    expect(board.shadowRoot!.activeElement).toBe(nameInput());
    expect(nameInput().size).toBe("small");
    // the quadrant picker: a radio per quadrant, the add button's checked
    const radios = Array.from(
      dialog.querySelectorAll<HTMLInputElement>("input[type=radio]"),
    );
    expect(
      radios.map((r) => r.closest<HTMLElement>(".quadrant")!.dataset.corner),
    ).toEqual(["topLeft", "topRight", "bottomLeft", "bottomRight"]);
    expect(radios.find((r) => r.checked)?.value).toBe("topRight");
    expect(dialog.querySelector("legend")?.textContent).toBe("Quadrant");

    await type("Plan sprint");
    await press(footer()[0]);
    expect(panel()).toBeNull();
    expect(find("[part=root]").hasAttribute("data-panel")).toBe(false);
    expect(changes).toEqual([]);

    await add("topRight");
    expect(footer()[1].disabled).toBe(true);
    await type("  Plan sprint ");
    expect(footer()[1].disabled).toBe(false);
    await press(footer()[1]);
    const center = quadrantCenter({}, "topRight");
    expect(changes).toEqual([
      [...TASKS, { x: center.x, y: center.y, label: "Plan sprint" }],
    ]);
    expect(panel()).toBeNull();
    // controlled: the board did not change its own points
    expect(board.points).toBe(TASKS);
  });

  it("a click on an empty area adds a task there; Enter in the name saves", async () => {
    const { engine, panel, changes, type, nameInput } = await setup();
    engine.fire("plotClick", { x: 7, y: 9 });
    await settle();
    expect(panel()?.dataset.quadrantTaskPanel).toBe("add");
    await type("Ship it");
    $<HTMLInputElement>(nameInput(), "input").dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
        composed: true,
      }),
    );
    await settle();
    expect(changes).toEqual([[...TASKS, { x: 7, y: 9, label: "Ship it" }]]);
    expect(panel()).toBeNull();
  });

  it("Escape closes the panel and gives the focus back", async () => {
    const { find, panel, nameInput, changes, add } = await setup();
    const button = $<HTMLButtonElement>(
      find(".header[data-corner=topLeft] minerva-icon-button"),
      "button",
    );
    button.focus();
    expect(deepActive()).toBe(button);
    await add("topLeft");
    expect(panel()).not.toBeNull();
    const escape = new KeyboardEvent("keydown", {
      key: "Escape",
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    $<HTMLInputElement>(nameInput(), "input").dispatchEvent(escape);
    await settle();
    expect(panel()).toBeNull();
    expect(escape.defaultPrevented).toBe(true);
    expect(deepActive()).toBe(button);
    expect(changes).toEqual([]);
  });

  it("a press outside the panel closes it; a press inside does not", async () => {
    const { panel, add } = await setup();
    await add("topLeft");
    panel()!
      .querySelector("input[type=radio]")!
      .dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true, composed: true }),
      );
    await settle();
    expect(panel()).not.toBeNull();
    document.body.dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true, composed: true }),
    );
    await settle();
    expect(panel()).toBeNull();
  });

  it("edit: renames the active task and keeps its other fields", async () => {
    const {
      engine,
      find,
      panel,
      changes,
      type,
      press,
      footer,
      nameInput,
      chart,
    } = await setup();
    await clickPoint(engine, 0);
    const toolbar = find(".cardActions");
    expect(toolbar.getAttribute("role")).toBe("toolbar");
    expect(toolbar.slot).toBe("point-actions");
    // the selected task keeps its point card, the toolbar in it
    const card =
      chart.shadowRoot!.querySelector<HTMLElement>("[part=point-card]");
    expect(card?.dataset.pointPreview).toBe("0");
    expect(chart.activeIndex).toBe(0);
    const slot = card!.querySelector<HTMLSlotElement>(
      "[data-card-actions][part=point-actions] slot",
    )!;
    expect(slot.assignedElements()).toEqual([toolbar]);
    expect(
      Array.from(
        toolbar.querySelectorAll<HTMLElement>("minerva-icon-button"),
        (button) => button.getAttribute("size"),
      ),
    ).toEqual(["xsmall", "xsmall"]);
    find("[data-action=edit]").click();
    await settle();
    expect(panel()?.dataset.quadrantTaskPanel).toBe("edit");
    // the panel names the task: the card gives way (`::part(point-card)`)
    expect(find("[part=root]").dataset.panel).toBe("draft");
    expect(panel()?.querySelector(".panelTitle")?.textContent?.trim()).toBe(
      "Edit task",
    );
    expect(nameInput().value).toBe("Fix login");
    await type("Fix login page");
    await press(footer()[1]);
    expect(changes).toEqual([
      [{ ...TASKS[0], label: "Fix login page" }, TASKS[1]],
    ]);
  });

  it("edit: picking another quadrant moves the task to its center", async () => {
    const { engine, panel, changes, press, footer } = await setup();
    // a double click opens the edit panel too
    await clickPoint(engine, 0);
    await clickPoint(engine, 0);
    const radio = (corner: string) =>
      panel()!.querySelector<HTMLInputElement>(
        `.quadrant[data-corner=${corner}] input[type=radio]`,
      )!;
    expect(radio("topLeft").checked).toBe(true);
    radio("bottomRight").click();
    await settle();
    expect(radio("bottomRight").checked).toBe(true);
    await press(footer()[1]);
    const center = quadrantCenter({}, "bottomRight");
    expect(changes).toEqual([
      [{ ...TASKS[0], x: center.x, y: center.y }, TASKS[1]],
    ]);
  });

  it("delete: asks inline first; Cancel keeps the task, Delete removes it", async () => {
    const { board, engine, find, panel, changes, press } = await setup();
    await clickPoint(engine, 1);
    find("[data-action=delete]").click();
    await settle();
    const confirm = panel()!;
    expect(confirm.getAttribute("role")).toBe("alertdialog");
    expect(confirm.dataset.quadrantTaskPanel).toBe("delete");
    expect(find("[part=root]").dataset.panel).toBe("delete");
    const root = board.shadowRoot!;
    expect(
      root
        .getElementById(confirm.getAttribute("aria-labelledby")!)
        ?.textContent?.trim(),
    ).toBe("Delete task");
    expect(
      root
        .getElementById(confirm.getAttribute("aria-describedby")!)
        ?.textContent?.trim(),
    ).toBe("“Inbox zero” will be removed from the board.");
    const buttons = () =>
      Array.from(confirm.querySelectorAll<MinervaButton>("minerva-button"));
    // Cancel takes the focus
    expect(root.activeElement).toBe(buttons()[0]);
    expect(buttons().map((b) => b.textContent?.trim())).toEqual([
      "Cancel",
      "Delete",
    ]);
    expect(buttons()[1].color).toBe("danger");
    await press(buttons()[0]);
    expect(panel()).toBeNull();
    expect(changes).toEqual([]);

    find("[data-action=delete]").click();
    await settle();
    await press(
      Array.from(panel()!.querySelectorAll<MinervaButton>("minerva-button"))[1],
    );
    expect(changes).toEqual([[TASKS[0]]]);
    expect(panel()).toBeNull();
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

  it("the toolbar acts on the task of the card: hovered, else the selected one", async () => {
    const { engine, find, panel, chart } = await setup();
    await clickPoint(engine, 0);
    engine.fire("hover", { x: 0, xLabel: "", items: [{ index: 1 }] });
    expect(chart.activeIndex).toBe(1);
    expect(
      chart.shadowRoot!.querySelector<HTMLElement>("[part=point-card]")?.dataset
        .pointPreview,
    ).toBe("1");
    find("[data-action=delete]").click();
    await settle();
    expect(panel()?.dataset.quadrantTaskPanel).toBe("delete");
    expect(panel()!.textContent).toContain("Inbox zero");
  });

  it("localizes its texts and applies `labels` overrides", async () => {
    const { board, engine, find, panel } = await setup();
    board.locale = "fr";
    board.labels = { add: "Nouvelle" };
    await settle();
    expect(
      find(".header[data-corner=topLeft] minerva-icon-button").getAttribute(
        "label",
      ),
    ).toMatch(/^Nouvelle · /);
    expect(find(".cardActions").getAttribute("aria-label")).toBe(
      "Actions de la tâche",
    );
    await clickPoint(engine, 0);
    find("[data-action=delete]").click();
    await settle();
    expect(
      Array.from(panel()!.querySelectorAll("minerva-button"), (b) =>
        b.textContent?.trim(),
      ),
    ).toEqual(["Annuler", "Supprimer"]);
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
