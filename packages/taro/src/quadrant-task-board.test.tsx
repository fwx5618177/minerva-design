import { act, fireEvent, render, screen, within } from "@testing-library/react";
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
    expect(headers[0]).toHaveTextContent("Q1Do first1+");
    expect(headers[3]).toHaveTextContent("Bottom right quadrant1+");
    expect(headers[1]).toHaveTextContent("Top right quadrant0+");
    expect(
      screen.getByRole("button", { name: "Add task · Do first" }),
    ).toBeInTheDocument();
    // no task selected: no actions
    expect(screen.queryByRole("toolbar")).not.toBeInTheDocument();
  });

  it("adds a task: cancel leaves the data, save appends it", () => {
    const onChange = vi.fn();
    const { container } = render(<Host onChange={onChange} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Add task · Top right quadrant" }),
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent("Add task");
    expect(
      within(dialog).getByRole("radio", { name: "Top right quadrant" }),
    ).toBeChecked();
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
    const next = onChange.mock.calls[0][0] as QuadrantPoint[];
    expect(next).toHaveLength(3);
    expect(next.slice(0, 2)).toEqual(TASKS);
    expect(next[2]).toEqual({ x: 7.5, y: 7.5, label: "Plan sprint" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    // the new task is selected
    expect(pointButton(container, "Plan sprint")).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByRole("toolbar", { name: "Task actions" }),
    ).toHaveTextContent("Plan sprint");
  });

  it("edits the selected task, keeping its other fields", () => {
    const onChange = vi.fn();
    const { container } = render(<Host onChange={onChange} />);
    act(() => pointButton(container, "Write report,").click());
    const toolbar = screen.getByRole("toolbar", { name: "Task actions" });
    fireEvent.click(within(toolbar).getByRole("button", { name: "Edit task" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent("Edit task");
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
