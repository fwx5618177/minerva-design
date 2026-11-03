import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import type { QuadrantChartProps, QuadrantPoint } from "@minerva/charts";
import { QuadrantTaskBoard } from "./index";
vi.mock("@minerva/charts", async (load) => ({
  ...(await load<typeof import("@minerva/charts")>()),
  QuadrantChart: (props: QuadrantChartProps) => (
    <div>
      <button
        onClick={() => props.onQuadrantClick?.("topLeft", { x: 8, y: 9 })}
      >
        Create
      </button>
      {props.points.map((point, index) => (
        <div key={index}>
          {point.label}
          {props.renderPointActions?.(point, index)}
        </div>
      ))}
    </div>
  ),
}));
const initial = [{ x: 2, y: 8, label: "Report", color: "red", size: 14 }];
function Host() {
  const [points, setPoints] = useState<QuadrantPoint[]>(initial);
  return <QuadrantTaskBoard points={points} onPointsChange={setPoints} />;
}
it("creates a task in an inline panel and leaves data unchanged on cancel", async () => {
  const user = userEvent.setup();
  const { container } = render(<Host />);
  await user.click(screen.getByText("Create"));
  let dialog = screen.getByRole("dialog", { name: "Add task" });
  // inline in the board, not a modal in a portal
  expect(container.contains(dialog)).toBe(true);
  expect(dialog.dataset.quadrantTaskPanel).toBe("add");
  const name = within(dialog).getByRole("textbox", { name: "Task name" });
  expect(document.activeElement).toBe(name);
  await user.type(name, "New task");
  await user.click(within(dialog).getByRole("button", { name: "Cancel" }));
  expect(screen.queryByText("New task")).toBeNull();
  expect(screen.queryByRole("dialog")).toBeNull();
  await user.click(screen.getByText("Create"));
  expect(screen.getByRole("dialog", { name: "Add task" })).toBeTruthy();
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).toBeNull();
  await user.click(screen.getByText("Create"));
  dialog = screen.getByRole("dialog", { name: "Add task" });
  await user.type(
    within(dialog).getByRole("textbox", { name: "Task name" }),
    "New task",
  );
  // the quadrant picker is a radio group laid out like the matrix
  await user.click(
    within(dialog).getByRole("radio", { name: "Bottom left quadrant" }),
  );
  await user.click(within(dialog).getByRole("button", { name: "Save" }));
  expect(screen.getByText("New task")).toBeTruthy();
});
it("closes the panel on a press outside it", async () => {
  const user = userEvent.setup();
  render(<Host />);
  await user.click(screen.getByText("Create"));
  expect(screen.getByRole("dialog")).toBeTruthy();
  await user.click(screen.getByText("Report"));
  expect(screen.queryByRole("dialog")).toBeNull();
});
it("preserves point metadata on edit and confirms deletion inline", async () => {
  const user = userEvent.setup();
  const change = vi.fn();
  render(<QuadrantTaskBoard points={initial} onPointsChange={change} />);
  await user.click(screen.getByRole("button", { name: "Edit task" }));
  const dialog = screen.getByRole("dialog", { name: "Edit task" });
  const input = within(dialog).getByRole("textbox", { name: "Task name" });
  await user.clear(input);
  await user.type(input, "Updated");
  await user.click(within(dialog).getByRole("button", { name: "Save" }));
  expect(change).toHaveBeenLastCalledWith([
    { ...initial[0], label: "Updated" },
  ]);
  await user.click(screen.getByRole("button", { name: "Delete task" }));
  const confirm = screen.getByRole("alertdialog", { name: "Delete task" });
  expect(confirm.dataset.quadrantTaskPanel).toBe("delete");
  expect(confirm.textContent).toContain("“Report” will be removed");
  await user.click(within(confirm).getByRole("button", { name: "Cancel" }));
  expect(change).toHaveBeenCalledTimes(1);
  await user.click(screen.getByRole("button", { name: "Delete task" }));
  await user.click(
    within(screen.getByRole("alertdialog")).getByRole("button", {
      name: "Delete",
    }),
  );
  expect(change).toHaveBeenLastCalledWith([]);
});
