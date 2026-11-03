// QuadrantTaskBoard against a fake chart engine: the real QuadrantChart
// renders its `quadrant-header` / `point-actions` slots once the engine
// reports the plot area; engine events (click, plotClick, drop) drive the
// board like a user on the canvas.
import { describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import { render, screen, within } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import type { QuadrantPoint } from "minerva-design/charts/core";

type Listener = (event: unknown) => void;
interface FakeEngine {
  options: Record<string, unknown>;
  fire(type: string, event: unknown): void;
}
const engines: FakeEngine[] = [];

vi.mock("minerva-design/charts/core", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("minerva-design/charts/core")>();
  return {
    ...actual,
    createChart: (
      _container: HTMLElement,
      options: Record<string, unknown>,
    ) => {
      const listeners = new Map<string, Set<Listener>>();
      const engine: FakeEngine = {
        options,
        fire: (type, event) =>
          listeners.get(type)?.forEach((listener) => listener(event)),
      };
      engines.push(engine);
      return {
        on: (type: string, listener: Listener) => {
          if (!listeners.has(type)) listeners.set(type, new Set());
          listeners.get(type)!.add(listener);
          return () => listeners.get(type)!.delete(listener);
        },
        setOptions: (next: Record<string, unknown>) => {
          engine.options = next;
        },
        destroy: () => {},
        getPlotRect: () => null,
      };
    },
  };
});

const { QuadrantTaskBoard } = await import("./index");

const initial: QuadrantPoint[] = [
  { x: 2, y: 8, label: "Report", color: "red", size: 14 },
];

/** Board bound with `v-model:points`, plus a `pointsChange` spy */
const mountBoard = (props: Record<string, unknown> = {}) => {
  const change = vi.fn();
  const points = ref<QuadrantPoint[]>(initial);
  const Host = defineComponent({
    setup: () => () =>
      h(QuadrantTaskBoard, {
        points: points.value,
        "onUpdate:points": (next: QuadrantPoint[]) => {
          points.value = next;
        },
        onPointsChange: change,
        ...props,
      }),
  });
  const { container } = render(Host);
  const engine = engines[engines.length - 1]!;
  return { change, points, engine, container };
};

/** The engine laid out the plot: the slots of the chart render */
const layout = async (engine: FakeEngine) => {
  engine.fire("layout", { x: 40, y: 10, width: 400, height: 300 });
  await nextTick();
};

describe("QuadrantTaskBoard", () => {
  it("renders a header per quadrant in place of the drawn titles", async () => {
    const { engine } = mountBoard({
      quadrants: { topLeft: { label: "Do first", badge: "Q1" } },
    });
    await layout(engine);
    const add = screen.getByRole("button", { name: "Add task · Do first" });
    const header = add.closest("[data-corner]")!;
    expect(header).toHaveAttribute("data-corner", "topLeft");
    expect(header).toHaveTextContent("Q1");
    expect(header).toHaveTextContent("1");
    expect(
      screen.getAllByRole("button", { name: /^Add task · / }),
    ).toHaveLength(4);
    const annotations = engine.options.annotations as Array<{
      label?: string;
    }>;
    expect(annotations.slice(0, 4).every((a) => a.label === undefined)).toBe(
      true,
    );
  });

  it("adds a task in an inline panel: cancel and Escape leave the data unchanged", async () => {
    const user = userEvent.setup();
    const { change, points, engine, container } = mountBoard();
    await layout(engine);

    const add = screen.getAllByRole("button", { name: /^Add task · / })[0]!;
    await user.click(add);
    const dialog = await screen.findByRole("dialog", { name: "Add task" });
    // inline in the board, not a modal in a portal
    expect(container.contains(dialog)).toBe(true);
    expect(dialog.dataset.quadrantTaskPanel).toBe("add");
    expect(dialog.dataset.placement).toBe("bottom");
    expect(container.querySelector("[data-panel]")).toHaveAttribute(
      "data-panel",
      "draft",
    );
    expect(add).toHaveAttribute("aria-expanded", "true");
    const name = within(dialog).getByRole("textbox", { name: "Task name" });
    expect(document.activeElement).toBe(name);
    await user.type(name, "New task");
    await user.click(within(dialog).getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(container.querySelector("[data-panel]")).toBeNull();
    expect(change).not.toHaveBeenCalled();
    expect(points.value).toEqual(initial);

    // Escape closes it and gives the focus back to the + button
    await user.click(add);
    await screen.findByRole("dialog", { name: "Add task" });
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(add);
    expect(change).not.toHaveBeenCalled();
  });

  it("adds a task on a click in a quadrant, in the quadrant picked", async () => {
    const user = userEvent.setup();
    const { change, points, engine } = mountBoard();
    await layout(engine);

    // a click on the empty area of a quadrant adds a task there
    engine.fire("plotClick", { x: 8, y: 9 });
    let dialog = await screen.findByRole("dialog", { name: "Add task" });
    const save = within(dialog).getByRole("button", { name: "Save" });
    expect(save).toBeDisabled();
    expect(
      within(dialog).getByRole("radio", { name: "Top right quadrant" }),
    ).toBeChecked();
    await user.type(
      within(dialog).getByRole("textbox", { name: "Task name" }),
      "  New task ",
    );
    await user.click(save);
    const expected = [...initial, { x: 8, y: 9, label: "New task" }];
    expect(change).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenLastCalledWith(expected);
    expect(points.value).toEqual(expected);
    expect(screen.queryByRole("dialog")).toBeNull();
    // the new task is selected
    expect(
      screen.getByRole("toolbar", { name: "Task actions" }).parentElement,
    ).toHaveAttribute("data-point-index", "1");

    // the quadrant picker is a radio group laid out like the matrix
    engine.fire("plotClick", { x: 8, y: 9 });
    dialog = await screen.findByRole("dialog", { name: "Add task" });
    const corners = within(dialog)
      .getAllByRole("radio")
      .map((radio) =>
        radio.closest("[data-corner]")!.getAttribute("data-corner"),
      );
    expect(corners).toEqual([
      "topLeft",
      "topRight",
      "bottomLeft",
      "bottomRight",
    ]);
    await user.type(
      within(dialog).getByRole("textbox", { name: "Task name" }),
      "Later",
    );
    const bottomLeft = within(dialog).getByRole("radio", {
      name: "Bottom left quadrant",
    });
    await user.click(bottomLeft);
    expect(bottomLeft).toBeChecked();
    await user.click(within(dialog).getByRole("button", { name: "Save" }));
    const added = points.value[2]!;
    expect(added.label).toBe("Later");
    expect(added.x).toBeLessThan(5);
    expect(added.y).toBeLessThan(5);
  });

  it("closes the panel on a press outside it", async () => {
    const user = userEvent.setup();
    const { change, engine } = mountBoard();
    await layout(engine);
    await user.click(
      screen.getAllByRole("button", { name: /^Add task · / })[0]!,
    );
    const dialog = await screen.findByRole("dialog", { name: "Add task" });
    // a press inside keeps it open
    await user.click(
      within(dialog).getByRole("radio", { name: "Bottom right quadrant" }),
    );
    expect(screen.getByRole("dialog")).toBe(dialog);
    await user.click(document.body);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(change).not.toHaveBeenCalled();
  });

  it("edits the active task and keeps its other fields", async () => {
    const user = userEvent.setup();
    const { change, engine } = mountBoard();
    await layout(engine);
    expect(screen.queryByRole("toolbar")).toBeNull();

    engine.fire("click", { items: [{ index: 0 }] });
    await nextTick();
    const toolbar = screen.getByRole("toolbar", { name: "Task actions" });
    await user.click(
      within(toolbar).getByRole("button", { name: "Edit task" }),
    );
    const dialog = await screen.findByRole("dialog", { name: "Edit task" });
    expect(dialog.dataset.quadrantTaskPanel).toBe("edit");
    const input = within(dialog).getByRole("textbox", { name: "Task name" });
    expect(input).toHaveValue("Report");
    expect(
      within(dialog).getByRole("radio", { name: "Top left quadrant" }),
    ).toBeChecked();
    await user.clear(input);
    await user.type(input, "Updated");
    await user.click(within(dialog).getByRole("button", { name: "Save" }));
    expect(change).toHaveBeenLastCalledWith([
      { ...initial[0], label: "Updated" },
    ]);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens the edit panel on a double click", async () => {
    const { engine } = mountBoard();
    engine.fire("click", { items: [{ index: 0 }] });
    engine.fire("click", { items: [{ index: 0 }] });
    expect(
      await screen.findByRole("dialog", { name: "Edit task" }),
    ).toBeInTheDocument();
  });

  it("deletes a task after an inline confirmation", async () => {
    const user = userEvent.setup();
    const { change, points, engine, container } = mountBoard();
    await layout(engine);
    engine.fire("click", { items: [{ index: 0 }] });
    await nextTick();

    await user.click(screen.getByRole("button", { name: "Delete task" }));
    let confirm = await screen.findByRole("alertdialog", {
      name: "Delete task",
    });
    expect(container.contains(confirm)).toBe(true);
    expect(confirm.dataset.quadrantTaskPanel).toBe("delete");
    expect(container.querySelector("[data-panel]")).toHaveAttribute(
      "data-panel",
      "delete",
    );
    expect(confirm).toHaveAccessibleDescription(
      "“Report” will be removed from the board.",
    );
    const cancel = within(confirm).getByRole("button", { name: "Cancel" });
    expect(document.activeElement).toBe(cancel);
    await user.click(cancel);
    expect(screen.queryByRole("alertdialog")).toBeNull();
    expect(change).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Delete task" }));
    confirm = await screen.findByRole("alertdialog");
    await user.click(within(confirm).getByRole("button", { name: "Delete" }));
    expect(change).toHaveBeenLastCalledWith([]);
    expect(points.value).toEqual([]);
    expect(screen.queryByRole("alertdialog")).toBeNull();
    expect(screen.queryByRole("toolbar")).toBeNull();
  });

  it("moves a dropped task to the drop position", async () => {
    const { change, points, engine } = mountBoard();
    expect(engine.options.interaction).toMatchObject({ dragPoints: true });
    engine.fire("drop", { item: { index: 0 }, x: 7, y: 2 });
    await nextTick();
    expect(change).toHaveBeenLastCalledWith([{ ...initial[0], x: 7, y: 2 }]);
    expect(points.value).toEqual([{ ...initial[0], x: 7, y: 2 }]);
  });

  it("applies the text overrides of `labels`", async () => {
    const { engine } = mountBoard({ labels: { add: "New" } });
    await layout(engine);
    expect(screen.getAllByRole("button", { name: /^New · / }).length).toBe(4);
  });
});
