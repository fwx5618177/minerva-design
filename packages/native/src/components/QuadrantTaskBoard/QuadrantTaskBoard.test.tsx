import { act, createRef, useState, type ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import {
  getByRoleDeep,
  hostElements,
  queryAllByRoleDeep,
  queryPart,
} from "../../../test/queries";
import type { ChartHandle, QuadrantPoint } from "../Chart";
import { QuadrantTaskBoard, type QuadrantTaskBoardProps } from "./index";

const initial: QuadrantPoint[] = [
  { x: 2, y: 8, label: "Report", color: "red", size: 14 },
  { x: 8, y: 2, label: "Inbox" },
];

/** Lets the dialogs finish their open / close animations */
const wait = (ms = 400) =>
  act(() => new Promise<void>((resolve) => setTimeout(resolve, ms)));

async function mount(ui: ReactElement) {
  const result = await render(
    <MinervaProvider locale={{ language: "en" }}>{ui}</MinervaProvider>,
  );
  // no layout pass in the test renderer: size the chart
  await fireEvent(queryPart("root", "chart")!, "layout", {
    nativeEvent: { layout: { x: 0, y: 0, width: 360, height: 320 } },
  });
  return result;
}

/** Controlled host keeping the points it receives */
function Host(
  props: Partial<QuadrantTaskBoardProps> & {
    onChange?: (points: QuadrantPoint[]) => void;
  },
) {
  const [points, setPoints] = useState<QuadrantPoint[]>(initial);
  return (
    <QuadrantTaskBoard
      points={points}
      {...props}
      onPointsChange={(next) => {
        props.onChange?.(next);
        setPoints(next);
      }}
    />
  );
}

const pointView = (index: number) =>
  hostElements().find(
    (el) =>
      el.props.dataSet?.part === "point" &&
      el.props.dataSet?.index === String(index),
  )!;

/** Selects a task like VoiceOver / TalkBack would (the "activate" action) */
const select = (index: number) =>
  fireEvent(pointView(index), "accessibilityAction", {
    nativeEvent: { actionName: "activate" },
  });

/** A responder event of one finger at `p` (`down`: still touching) */
const touchEvent = (p: { x: number; y: number }, down: boolean) => {
  const touch = {
    identifier: 1,
    pageX: p.x,
    pageY: p.y,
    locationX: p.x,
    locationY: p.y,
  };
  return {
    nativeEvent: {
      ...touch,
      touches: down ? [touch] : [],
      changedTouches: [touch],
    },
    touchHistory: { numberActiveTouches: down ? 1 : 0 },
  };
};

const surface = () => queryPart("surface", "chart")!.props;

/** Drags a finger through `path` on the chart, then lifts it */
async function gesture(...path: { x: number; y: number }[]) {
  const [first, ...rest] = path;
  const last = path[path.length - 1]!;
  await act(async () => surface().onResponderGrant(touchEvent(first!, true)));
  for (const p of rest)
    await act(async () => surface().onResponderMove(touchEvent(p, true)));
  await act(async () => {
    surface().onResponderEnd(touchEvent(last, false));
    surface().onResponderRelease(touchEvent(last, false));
  });
}

describe("QuadrantTaskBoard (native)", () => {
  it("renders a header per quadrant with its count and an add button", async () => {
    await mount(
      <Host
        quadrants={{
          topLeft: { label: "Do first", badge: "Q1" },
          bottomRight: { label: "Eliminate" },
        }}
      />,
    );
    const headers = hostElements().filter(
      (el) =>
        el.props.dataSet?.minerva === "quadrant-task-board" &&
        el.props.dataSet?.part === "header",
    );
    expect(headers.map((h) => h.props.dataSet.corner)).toEqual([
      "topLeft",
      "topRight",
      "bottomLeft",
      "bottomRight",
    ]);
    expect(screen.getByText("Do first")).toBeTruthy();
    expect(screen.getByText("Q1")).toBeTruthy();
    expect(screen.getByText("Top right quadrant")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Add task · Do first" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Add task · Eliminate" }),
    ).toBeTruthy();
    // one task top left, one bottom right
    const counts = hostElements()
      .filter((el) => el.props.dataSet?.part === "count")
      .map((el) => el.props.children);
    expect(counts).toEqual(["1", "0", "0", "1"]);
    // no toolbar until a task is selected
    expect(queryAllByRoleDeep("toolbar")).toEqual([]);
  });

  it("adds a task from a quadrant header; cancel leaves the data unchanged", async () => {
    const onChange = vi.fn();
    await mount(<Host onChange={onChange} />);
    await fireEvent.press(
      screen.getByRole("button", { name: "Add task · Top right quadrant" }),
    );
    expect(getByRoleDeep("dialog", { name: "Add task" })).toBeTruthy();
    await fireEvent.changeText(screen.getByLabelText("Task name"), "New task");
    await fireEvent.press(screen.getByRole("button", { name: "Cancel" }));
    await wait();
    expect(queryAllByRoleDeep("dialog")).toEqual([]);
    expect(onChange).not.toHaveBeenCalled();

    await fireEvent.press(
      screen.getByRole("button", { name: "Add task · Top right quadrant" }),
    );
    // a fresh draft: the cancelled name is gone, Save waits for a name
    expect(screen.getByLabelText("Task name").props.value).toBe("");
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
    expect(
      screen.getByRole("radio", { name: "Top right quadrant" }),
    ).toBeChecked();
    await fireEvent.changeText(
      screen.getByLabelText("Task name"),
      "  New task ",
    );
    await fireEvent.press(screen.getByRole("button", { name: "Save" }));
    expect(onChange).toHaveBeenCalledExactlyOnceWith([
      ...initial,
      { x: 7.5, y: 7.5, label: "New task" },
    ]);
    await wait();
    expect(queryAllByRoleDeep("dialog")).toEqual([]);
    // the new task is selected: its toolbar is shown
    expect(getByRoleDeep("toolbar", { name: "Task actions" })).toBeTruthy();
    expect(queryPart("point-actions", "chart")!.props.dataSet.index).toBe("2");
  });

  it("a tap on the empty area of a quadrant opens the add dialog there", async () => {
    const ref = createRef<ChartHandle>();
    const onChange = vi.fn();
    await mount(<Host ref={ref} onChange={onChange} />);
    const p = ref.current!.getController()!.toPixel(3, 3)!;
    await gesture(p);
    expect(getByRoleDeep("dialog", { name: "Add task" })).toBeTruthy();
    expect(
      screen.getByRole("radio", { name: "Bottom left quadrant" }),
    ).toBeChecked();
    await fireEvent.changeText(screen.getByLabelText("Task name"), "Here");
    await fireEvent.press(screen.getByRole("button", { name: "Save" }));
    const [next] = onChange.mock.calls[0]!;
    expect(next[2].label).toBe("Here");
    expect(next[2].x).toBeCloseTo(3, 0);
    expect(next[2].y).toBeCloseTo(3, 0);
  });

  it("edits the selected task and keeps its other fields", async () => {
    const onChange = vi.fn();
    await mount(<Host onChange={onChange} />);
    await select(0);
    await fireEvent.press(screen.getByRole("button", { name: "Edit task" }));
    expect(getByRoleDeep("dialog", { name: "Edit task" })).toBeTruthy();
    expect(screen.getByLabelText("Task name").props.value).toBe("Report");
    expect(
      screen.getByRole("radio", { name: "Top left quadrant" }),
    ).toBeChecked();
    await fireEvent.changeText(screen.getByLabelText("Task name"), "Updated");
    await fireEvent.press(screen.getByRole("button", { name: "Save" }));
    expect(onChange).toHaveBeenLastCalledWith([
      { ...initial[0], label: "Updated" },
      initial[1],
    ]);
    await wait();

    // another quadrant: the task moves to its center
    await fireEvent.press(screen.getByRole("button", { name: "Edit task" }));
    await fireEvent.press(
      screen.getByRole("radio", { name: "Bottom right quadrant" }),
    );
    await fireEvent.press(screen.getByRole("button", { name: "Save" }));
    expect(onChange).toHaveBeenLastCalledWith([
      { ...initial[0], label: "Updated", x: 7.5, y: 2.5 },
      initial[1],
    ]);
  });

  it("deletes the selected task after a confirmation", async () => {
    const onChange = vi.fn();
    await mount(<Host onChange={onChange} />);
    await select(0);
    await fireEvent.press(screen.getByRole("button", { name: "Delete task" }));
    const confirm = getByRoleDeep("alertdialog", { name: "Delete task" });
    expect(confirm).toBeTruthy();
    expect(
      screen.getByText("“Report” will be removed from the board."),
    ).toBeTruthy();
    await fireEvent.press(screen.getByRole("button", { name: "Cancel" }));
    await wait();
    expect(onChange).not.toHaveBeenCalled();
    expect(queryAllByRoleDeep("alertdialog")).toEqual([]);

    await fireEvent.press(screen.getByRole("button", { name: "Delete task" }));
    await fireEvent.press(screen.getByRole("button", { name: "Delete" }));
    expect(onChange).toHaveBeenCalledExactlyOnceWith([initial[1]]);
    await wait();
    expect(queryAllByRoleDeep("alertdialog")).toEqual([]);
    // the deleted task was the selection: no toolbar left
    expect(queryAllByRoleDeep("toolbar")).toEqual([]);
  });

  it("moves a task with the accessibility actions of its point", async () => {
    const onChange = vi.fn();
    await mount(<Host onChange={onChange} />);
    await fireEvent(pointView(0), "accessibilityAction", {
      nativeEvent: { actionName: "move:bottomLeft" },
    });
    expect(onChange).toHaveBeenCalledExactlyOnceWith([
      { ...initial[0], x: 2.5, y: 2.5 },
      initial[1],
    ]);
    // the moved task becomes the selection
    expect(getByRoleDeep("toolbar", { name: "Task actions" })).toBeTruthy();
  });

  it("moves a task by drag and drop", async () => {
    const ref = createRef<ChartHandle>();
    const onChange = vi.fn();
    await mount(<Host ref={ref} onChange={onChange} />);
    const controller = ref.current!.getController()!;
    const from = controller.toPixel(2, 8)!;
    const to = controller.toPixel(8, 7)!;
    await gesture(from, { x: from.x + 20, y: from.y + 20 }, to);
    expect(onChange).toHaveBeenCalledTimes(1);
    const [next] = onChange.mock.calls[0]!;
    expect(next[0]).toMatchObject({ label: "Report", color: "red", size: 14 });
    expect(next[0].x).toBeCloseTo(8, 0);
    expect(next[0].y).toBeCloseTo(7, 0);
    expect(next[1]).toBe(initial[1]);
  });

  it("takes label overrides and follows the language", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <QuadrantTaskBoard
          points={initial}
          onPointsChange={() => {}}
          selectedIndex={1}
          labels={{ delete: "移除" }}
        />
      </MinervaProvider>,
    );
    await fireEvent(queryPart("root", "chart")!, "layout", {
      nativeEvent: { layout: { x: 0, y: 0, width: 360, height: 320 } },
    });
    expect(getByRoleDeep("toolbar", { name: "任务操作" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "编辑任务" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "移除" })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "添加任务 · 左上象限" }),
    ).toBeTruthy();
  });
});
