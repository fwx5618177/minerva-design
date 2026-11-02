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
  render(Host);
  const engine = engines[engines.length - 1]!;
  return { change, points, engine };
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

  it("adds a task: cancel leaves the data unchanged, save appends it", async () => {
    const user = userEvent.setup();
    const { change, points, engine } = mountBoard();
    await layout(engine);

    await user.click(
      screen.getAllByRole("button", { name: /^Add task · / })[0]!,
    );
    let dialog = await screen.findByRole("dialog", { name: "Add task" });
    await user.type(
      within(dialog).getByRole("textbox", { name: "Task name" }),
      "New task",
    );
    await user.click(within(dialog).getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(change).not.toHaveBeenCalled();
    expect(points.value).toEqual(initial);

    // a click on the empty area of a quadrant adds a task there
    engine.fire("plotClick", { x: 8, y: 9 });
    dialog = await screen.findByRole("dialog", { name: "Add task" });
    const save = within(dialog).getByRole("button", { name: "Save" });
    expect(save).toBeDisabled();
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
    const input = within(dialog).getByRole("textbox", { name: "Task name" });
    expect(input).toHaveValue("Report");
    await user.clear(input);
    await user.type(input, "Updated");
    await user.click(within(dialog).getByRole("button", { name: "Save" }));
    expect(change).toHaveBeenLastCalledWith([
      { ...initial[0], label: "Updated" },
    ]);
  });

  it("opens the edit dialog on a double click", async () => {
    const { engine } = mountBoard();
    engine.fire("click", { items: [{ index: 0 }] });
    engine.fire("click", { items: [{ index: 0 }] });
    expect(
      await screen.findByRole("dialog", { name: "Edit task" }),
    ).toBeInTheDocument();
  });

  it("deletes a task after a confirmation", async () => {
    const user = userEvent.setup();
    const { change, points, engine } = mountBoard();
    await layout(engine);
    engine.fire("click", { items: [{ index: 0 }] });
    await nextTick();

    await user.click(screen.getByRole("button", { name: "Delete task" }));
    let confirm = await screen.findByRole("alertdialog");
    expect(confirm).toHaveTextContent(
      "“Report” will be removed from the board.",
    );
    await user.click(within(confirm).getByRole("button", { name: "Cancel" }));
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
