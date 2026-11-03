import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import * as M from "./index";
import type { QuadrantPoint } from "./charts";

const TASKS: QuadrantPoint[] = [
  { x: 2, y: 8, label: "Write report", color: "#e11d48", size: 9 },
  { x: 7, y: 3, label: "Reply mail" },
];

function Host({
  initial = TASKS,
  onChange,
}: {
  initial?: QuadrantPoint[];
  onChange?: (points: QuadrantPoint[]) => void;
}) {
  const [points, setPoints] = useState(initial);
  return (
    <M.QuadrantTaskBoard
      locale="en"
      points={points}
      onPointsChange={(next) => {
        onChange?.(next);
        setPoints(next);
      }}
    />
  );
}

const pointButton = (container: HTMLElement, label: string) => {
  const button = [
    ...container.querySelectorAll(
      '[data-minerva="chart-quadrant-points"] [role="button"]',
    ),
  ].find((b) => b.getAttribute("aria-label")?.startsWith(label));
  if (!button) throw new Error(`no point button ${label}`);
  return button as HTMLElement;
};

const typeName = (value: string) => {
  const input = within(screen.getByRole("dialog")).getByLabelText(
    "Task name",
  ) as HTMLInputElement;
  fireEvent.input(input, { target: { value } });
};

describe("Taro QuadrantTaskBoard", () => {
  it("renders a header per quadrant with its count and add button", () => {
    render(
      <M.QuadrantTaskBoard
        locale="en"
        points={TASKS}
        quadrants={{ topLeft: { label: "Do first", badge: "Q1" } }}
        onPointsChange={() => {}}
      />,
    );
    const headers = document.querySelectorAll(
      ".mn-quadrant-task-board__header",
    );
    expect([...headers].map((h) => h.getAttribute("data-corner"))).toEqual([
      "topLeft",
      "topRight",
      "bottomLeft",
      "bottomRight",
    ]);
    // the add buttons show a plus icon, not a "+" glyph
    expect(headers[0]).toHaveTextContent(/^Q1Do first1$/);
    expect(headers[3]).toHaveTextContent(/^Bottom right quadrant1$/);
    expect(headers[1]).toHaveTextContent(/^Top right quadrant0$/);
    const add = screen.getByRole("button", { name: "Add task · Do first" });
    expect(add).not.toHaveTextContent("+");
    const icon = add.querySelector("img") as HTMLImageElement;
    expect(icon).toBeInstanceOf(HTMLImageElement);
    const src = icon.getAttribute("src") ?? "";
    expect(src).toMatch(/^data:image\/svg\+xml;base64,/);
    const svg = atob(src.split(",")[1]!);
    expect(svg).toContain("<svg");
    expect(svg).toMatch(/M12 5v14|M5 12h14/);
    // no task selected: no actions
    expect(screen.queryByRole("toolbar")).not.toBeInTheDocument();
  });

  it("adds a task in an inline panel: cancel leaves the data, save appends it", async () => {
    const onChange = vi.fn();
    const { container } = render(<Host onChange={onChange} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Add task · Top right quadrant" }),
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent("Add task");
    // an inline panel of the board below the headers, not a modal
    expect(dialog).toHaveClass(
      "mn-quadrant-task-board__panel",
      "mn-quadrant-task-board__panel--caret-end",
    );
    expect(dialog).toHaveAttribute("data-quadrant-task-panel", "add");
    const board = container.querySelector(".mn-quadrant-task-board")!;
    expect(board).toContainElement(dialog);
    expect(
      board.querySelector(".mn-quadrant-task-board__quadrants")!
        .nextElementSibling,
    ).toBe(dialog);
    expect(
      document.querySelector(".mn-modal, .mn-overlay-mask"),
    ).not.toBeInTheDocument();
    await waitFor(() =>
      expect(within(dialog).getByLabelText("Task name")).toHaveFocus(),
    );
    expect(
      within(dialog).getByRole("radio", { name: "Top right quadrant" }),
    ).toBeChecked();
    expect(
      within(dialog).getByRole("radio", { name: "Top left quadrant" }),
    ).not.toBeChecked();
    typeName("Plan sprint");
    fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.click(
      screen.getByRole("button", { name: "Add task · Top right quadrant" }),
    );
    // empty name: save is disabled
    const save = within(screen.getByRole("dialog")).getByRole("button", {
      name: "Save",
    });
    expect(save).toHaveAttribute("aria-disabled", "true");
    typeName("  Plan sprint ");
    fireEvent.click(
      within(screen.getByRole("dialog")).getByRole("button", { name: "Save" }),
    );
    expect(onChange).toHaveBeenCalledTimes(1);
    let next = onChange.mock.calls[0][0] as QuadrantPoint[];
    expect(next).toHaveLength(3);
    expect(next.slice(0, 2)).toEqual(TASKS);
    expect(next[2]).toEqual({ x: 7.5, y: 7.5, label: "Plan sprint" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // the quadrant chips pick where the task goes
    fireEvent.click(
      screen.getByRole("button", { name: "Add task · Top left quadrant" }),
    );
    expect(screen.getByRole("dialog")).toHaveClass(
      "mn-quadrant-task-board__panel--caret-start",
    );
    typeName("Later");
    fireEvent.click(
      within(screen.getByRole("dialog")).getByRole("radio", {
        name: "Bottom right quadrant",
      }),
    );
    expect(
      within(screen.getByRole("dialog")).getByRole("radio", {
        name: "Bottom right quadrant",
      }),
    ).toBeChecked();
    fireEvent.click(
      within(screen.getByRole("dialog")).getByRole("button", { name: "Save" }),
    );
    expect(onChange).toHaveBeenCalledTimes(2);
    expect((onChange.mock.calls[1][0] as QuadrantPoint[])[3]).toEqual({
      x: 7.5,
      y: 2.5,
      label: "Later",
    });
    next = onChange.mock.calls[1][0] as QuadrantPoint[];
    // the last saved task is selected
    expect(pointButton(container, "Later")).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByRole("toolbar", { name: "Task actions" }),
    ).toHaveTextContent("Later");
    expect(next).toHaveLength(4);
  });

  it("edits the selected task, keeping its other fields", () => {
    const onChange = vi.fn();
    const { container } = render(<Host onChange={onChange} />);
    act(() => pointButton(container, "Write report,").click());
    const toolbar = screen.getByRole("toolbar", { name: "Task actions" });
    fireEvent.click(within(toolbar).getByRole("button", { name: "Edit task" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent("Edit task");
    // inline, right below the actions, the caret at Edit
    expect(dialog).toHaveAttribute("data-quadrant-task-panel", "edit");
    expect(dialog).toHaveClass("mn-quadrant-task-board__panel--caret-edit");
    expect(toolbar.nextElementSibling).toBe(dialog);
    expect(
      within(dialog).getByRole("radio", { name: "Top left quadrant" }),
    ).toBeChecked();
    expect(
      (within(dialog).getByLabelText("Task name") as HTMLInputElement).value,
    ).toBe("Write report");
    typeName("Write the report");
    fireEvent.click(within(dialog).getByRole("button", { name: "Save" }));
    expect(onChange).toHaveBeenLastCalledWith([
      { ...TASKS[0], label: "Write the report" },
      TASKS[1],
    ]);

    // picking another quadrant moves the task to its center
    act(() => pointButton(container, "Write the report,").click());
    fireEvent.click(
      within(screen.getByRole("toolbar")).getByRole("button", {
        name: "Edit task",
      }),
    );
    fireEvent.click(
      within(screen.getByRole("dialog")).getByRole("radio", {
        name: "Bottom right quadrant",
      }),
    );
    fireEvent.click(
      within(screen.getByRole("dialog")).getByRole("button", { name: "Save" }),
    );
    expect(onChange).toHaveBeenLastCalledWith([
      { ...TASKS[0], label: "Write the report", x: 7.5, y: 2.5 },
      TASKS[1],
    ]);
  });

  it("deletes the selected task after a confirmation", () => {
    const onChange = vi.fn();
    const { container } = render(<Host onChange={onChange} />);
    act(() => pointButton(container, "Reply mail,").click());
    fireEvent.click(
      within(screen.getByRole("toolbar")).getByRole("button", {
        name: "Delete task",
      }),
    );
    let confirm = screen.getByRole("alertdialog");
    expect(confirm).toHaveTextContent("Reply mail");
    expect(confirm).toHaveAttribute("data-quadrant-task-panel", "delete");
    expect(confirm).toHaveClass("mn-quadrant-task-board__panel--caret-delete");
    expect(screen.getByRole("toolbar").nextElementSibling).toBe(confirm);
    expect(
      document.querySelector(".mn-modal, .mn-overlay-mask"),
    ).not.toBeInTheDocument();
    fireEvent.click(within(confirm).getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.click(
      within(screen.getByRole("toolbar")).getByRole("button", {
        name: "Delete task",
      }),
    );
    confirm = screen.getByRole("alertdialog");
    fireEvent.click(within(confirm).getByRole("button", { name: "Delete" }));
    expect(onChange).toHaveBeenCalledWith([TASKS[0]]);
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    expect(screen.queryByRole("toolbar")).not.toBeInTheDocument();
  });

  it("moves a task with the move to actions, updating x and y", () => {
    const onChange = vi.fn();
    const { container } = render(<Host onChange={onChange} />);
    act(() =>
      pointButton(
        container,
        "Write report, Move to Bottom left quadrant",
      ).click(),
    );
    expect(onChange).toHaveBeenCalledWith([
      { ...TASKS[0], x: 2.5, y: 2.5 },
      TASKS[1],
    ]);
    expect(screen.getByRole("toolbar")).toHaveTextContent("Write report");
  });

  it("opening another panel replaces the open one", () => {
    const { container } = render(<Host />);
    fireEvent.click(
      screen.getByRole("button", { name: "Add task · Top left quadrant" }),
    );
    act(() => pointButton(container, "Reply mail,").click());
    // a tap on a task closes the panel, like a press outside a popover
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(
      within(screen.getByRole("toolbar")).getByRole("button", {
        name: "Edit task",
      }),
    );
    fireEvent.click(
      within(screen.getByRole("toolbar")).getByRole("button", {
        name: "Delete task",
      }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(
      container.querySelectorAll(".mn-quadrant-task-board__panel"),
    ).toHaveLength(1);
  });

  it("uses the label overrides and a controlled selection", () => {
    render(
      <M.QuadrantTaskBoard
        locale="en"
        points={TASKS}
        selectedIndex={1}
        labels={{ edit: "Rename", actions: "Card" }}
        onPointsChange={() => {}}
      />,
    );
    const toolbar = screen.getByRole("toolbar", { name: "Card" });
    expect(toolbar).toHaveTextContent("Reply mail");
    fireEvent.click(within(toolbar).getByRole("button", { name: "Rename" }));
    expect(screen.getByRole("dialog")).toHaveTextContent("Rename");
  });
});
