// QuadrantTaskBoard with the real QuadrantChart (no mock): a pointer drag
// moves a task with its live marks and card, the dropped task is selected
// and its card actions open the inline edit / delete panels; the quadrant
// headers open the add panel.
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import type { ChartHandle, QuadrantPoint } from "@minerva/charts";
import { QuadrantTaskBoard } from "./index";

const flush = () =>
  act(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => setTimeout(resolve, 0)),
      ),
  );

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(500);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(300);
});

afterEach(() => {
  vi.restoreAllMocks();
});

const initial: QuadrantPoint[] = [
  { x: 2, y: 8, label: "Write report" },
  { x: 7, y: 7, label: "Plan sprint" },
];

function Board({
  chart,
  onChange,
}: {
  chart: React.Ref<ChartHandle>;
  onChange: (points: QuadrantPoint[]) => void;
}) {
  const [points, setPoints] = useState(initial);
  return (
    <QuadrantTaskBoard
      ref={chart}
      locale="en"
      points={points}
      onPointsChange={(next) => {
        setPoints(next);
        onChange(next);
      }}
    />
  );
}

const setup = async () => {
  const chart = createRef<ChartHandle>();
  const onChange = vi.fn();
  const view = render(<Board chart={chart} onChange={onChange} />);
  await flush();
  const instance = chart.current!.getInstance()!;
  const stage = view.container.querySelector<HTMLElement>(
    ".minerva-chart-stage",
  )!;
  const fire = (type: string, at: { x: number; y: number }) =>
    stage.dispatchEvent(
      new PointerEvent(type, {
        clientX: at.x,
        clientY: at.y,
        button: 0,
        buttons: type === "pointerup" ? 0 : 1,
        pointerId: 1,
      }),
    );
  const mark = (name: string) =>
    view.container.querySelector<HTMLElement>(`[data-drag-mark="${name}"]`);
  const labelled = (label: string) =>
    view.container.querySelector(`[data-label="${label}"]`);
  return {
    ...view,
    onChange,
    toPixel: (x: number, y: number) => instance.toPixel(x, y)!,
    fire,
    mark,
    labelled,
    user: userEvent.setup(),
  };
};

it("drags a task live and selects it where it is dropped", async () => {
  const { container, onChange, toPixel, fire, mark } = await setup();
  const from = toPixel(2, 8);
  const to = toPixel(8, 2);
  fire("pointermove", from);
  fire("pointerdown", from);
  fire("pointermove", { x: from.x + 20, y: from.y + 20 });
  fire("pointermove", to);
  await flush();

  // the dot follows the pointer; origin and drop target are shown, the
  // label pill is not (the card names the task)
  expect(parseFloat(mark("dot")!.style.left)).toBeCloseTo(to.x, 0);
  expect(parseFloat(mark("dot")!.style.top)).toBeCloseTo(to.y, 0);
  expect(mark("origin")!.style.display).toBe("block");
  expect(mark("target")!.style.display).toBe("block");
  expect(mark("label")!.style.display).toBe("none");
  const card = container.querySelector<HTMLElement>(
    "[data-point-preview][data-dragging]",
  );
  expect(card).not.toBeNull();
  expect(card!.textContent).toContain("Write report");

  fire("pointermove", { x: to.x + 20, y: to.y - 10 });
  await flush();
  expect(parseFloat(mark("dot")!.style.left)).toBeCloseTo(to.x + 20, 0);
  expect(parseFloat(mark("dot")!.style.top)).toBeCloseTo(to.y - 10, 0);

  fire("pointerup", { x: to.x + 20, y: to.y - 10 });
  await flush();
  expect(onChange).toHaveBeenCalledTimes(1);
  const moved = onChange.mock.calls[0]![0][0] as QuadrantPoint;
  expect(moved.label).toBe("Write report");
  expect(moved.x).toBeGreaterThan(5);
  expect(moved.y).toBeLessThan(5);
  expect(mark("dot")!.style.display).toBe("none");
  // the dropped task is selected: its card holds the compact actions
  const selected = container.querySelector<HTMLElement>(
    '[data-point-preview="0"]',
  );
  expect(selected).not.toBeNull();
  expect(selected!.hasAttribute("data-dragging")).toBe(false);
  expect(
    within(selected!).getByRole("button", { name: "Edit task" }),
  ).toBeInTheDocument();
});

it("edits, deletes after confirmation and adds tasks from the board", async () => {
  const { container, toPixel, fire, labelled, user } = await setup();
  const at = toPixel(2, 8);
  fire("pointermove", at);
  fire("pointerdown", at);
  fire("pointerup", at);
  await flush();

  await user.click(screen.getByRole("button", { name: "Edit task" }));
  const edit = screen.getByRole("dialog", { name: "Edit task" });
  expect(container.contains(edit)).toBe(true);
  expect(edit).toHaveAttribute("data-quadrant-task-panel", "edit");
  const name = within(edit).getByRole("textbox", { name: "Task name" });
  await user.clear(name);
  await user.type(name, "Revised task");
  await user.click(within(edit).getByRole("button", { name: "Save" }));
  await flush();
  expect(labelled("Revised task")).not.toBeNull();

  await user.click(screen.getByRole("button", { name: "Delete task" }));
  await user.click(
    within(screen.getByRole("alertdialog")).getByRole("button", {
      name: "Cancel",
    }),
  );
  await flush();
  expect(labelled("Revised task")).not.toBeNull();
  await user.click(screen.getByRole("button", { name: "Delete task" }));
  await user.click(
    within(screen.getByRole("alertdialog")).getByRole("button", {
      name: "Delete",
    }),
  );
  await flush();
  expect(labelled("Revised task")).toBeNull();

  await user.click(screen.getAllByRole("button", { name: /^Add task ·/ })[0]!);
  const create = screen.getByRole("dialog", { name: "Add task" });
  expect(within(create).getByRole("button", { name: "Save" })).toBeDisabled();
  await user.type(
    within(create).getByRole("textbox", { name: "Task name" }),
    "Another task",
  );
  await user.click(within(create).getAllByRole("radio")[3]!);
  await user.click(within(create).getByRole("button", { name: "Save" }));
  await flush();
  expect(labelled("Another task")).not.toBeNull();
});
