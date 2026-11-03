import { act, createRef, useState, type ReactElement } from "react";
import {
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { placeQuadrantTaskPanel } from "@minerva/charts/canvas";
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

const BOARD = { width: 360, height: 320 };

const layout = (size: { width: number; height: number }) => ({
  nativeEvent: { layout: { x: 0, y: 0, ...size } },
});

async function mount(ui: ReactElement) {
  const result = await render(
    <MinervaProvider locale={{ language: "en" }}>{ui}</MinervaProvider>,
  );
  // no layout pass in the test renderer: size the board and its chart
  await fireEvent(
    queryPart("root", "quadrant-task-board")!,
    "layout",
    layout(BOARD),
  );
  await fireEvent(queryPart("root", "chart")!, "layout", layout(BOARD));
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

const panel = () => queryPart("panel", "quadrant-task-board");
const panelStyle = () => panel()!.props.style;
/** The rendered panel gets its size */
const measurePanel = (size = { width: 288, height: 200 }) =>
  fireEvent(panel()!, "layout", layout(size));

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
    // no toolbar until a task is selected, no panel until asked
    expect(queryAllByRoleDeep("toolbar")).toEqual([]);
    expect(panel()).toBeNull();
  });

  it("adds a task in an inline panel from a quadrant header; cancel leaves the data unchanged", async () => {
    const onChange = vi.fn();
    await mount(<Host onChange={onChange} />);
    await fireEvent.press(
      screen.getByRole("button", { name: "Add task · Top right quadrant" }),
    );
    const dialog = getByRoleDeep("dialog", { name: "Add task" });
    // inline in the board, not a modal
    expect(dialog.props.dataSet).toMatchObject({
      minerva: "quadrant-task-board",
      part: "panel",
      kind: "add",
    });
    expect(dialog.props.accessibilityViewIsModal).toBe(false);
    expect(queryPart("root", "quadrant-task-board")!.props.dataSet.panel).toBe(
      "add",
    );
    expect(within(dialog).getByRole("header").props.children).toBe("Add task");
    expect(screen.getByLabelText("Task name").props.autoFocus).toBe(true);
    await fireEvent.changeText(screen.getByLabelText("Task name"), "New task");
    await fireEvent.press(screen.getByRole("button", { name: "Cancel" }));
    expect(panel()).toBeNull();
    expect(onChange).not.toHaveBeenCalled();

    await fireEvent.press(
      screen.getByRole("button", { name: "Add task · Top right quadrant" }),
    );
    // a fresh draft: the cancelled name is gone, Save waits for a name
    expect(screen.getByLabelText("Task name").props.value).toBe("");
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
    // the four quadrants as radios, two by two like the matrix
    expect(
      screen.getAllByRole("radio").map((r) => r.props.accessibilityLabel),
    ).toEqual([
      "Top left quadrant",
      "Top right quadrant",
      "Bottom left quadrant",
      "Bottom right quadrant",
    ]);
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
    expect(panel()).toBeNull();
    // the new task is selected: its toolbar is shown
    expect(getByRoleDeep("toolbar", { name: "Task actions" })).toBeTruthy();
    expect(queryPart("point-actions", "chart")!.props.dataSet.index).toBe("2");
  });

  it("picks another quadrant with the radios", async () => {
    const onChange = vi.fn();
    await mount(<Host onChange={onChange} />);
    await fireEvent.press(
      screen.getByRole("button", { name: "Add task · Top left quadrant" }),
    );
    // below the header strip of the quadrant until the + button is measured
    await measurePanel();
    expect(panelStyle().opacity).toBe(1);
    expect(panel()!.props.dataSet.placement).toBe("bottom");
    expect(panelStyle().left).toBe(0);
    expect(panelStyle().top).toBeGreaterThan(40);
    await fireEvent.changeText(screen.getByLabelText("Task name"), "Later");
    await fireEvent.press(
      screen.getByRole("radio", { name: "Bottom left quadrant" }),
    );
    expect(
      screen.getByRole("radio", { name: "Bottom left quadrant" }),
    ).toBeChecked();
    expect(
      screen.getByRole("radio", { name: "Top left quadrant" }),
    ).not.toBeChecked();
    // the keyboard "done" key saves too
    await fireEvent(screen.getByLabelText("Task name"), "submitEditing");
    expect(onChange).toHaveBeenCalledExactlyOnceWith([
      ...initial,
      { x: 2.5, y: 2.5, label: "Later" },
    ]);
    expect(panel()).toBeNull();
  });

  it("closes the panel on a press outside it", async () => {
    const onChange = vi.fn();
    await mount(<Host onChange={onChange} />);
    await fireEvent.press(
      screen.getByRole("button", { name: "Add task · Top left quadrant" }),
    );
    await fireEvent.changeText(screen.getByLabelText("Task name"), "Draft");
    expect(panel()).not.toBeNull();
    await fireEvent.press(queryPart("backdrop", "quadrant-task-board")!);
    expect(panel()).toBeNull();
    expect(queryPart("backdrop", "quadrant-task-board")).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("a tap on the empty area of a quadrant opens the add panel there", async () => {
    const ref = createRef<ChartHandle>();
    const onChange = vi.fn();
    await mount(<Host ref={ref} onChange={onChange} />);
    // the caller's ref still gets the chart handle
    const p = ref.current!.getController()!.toPixel(3, 3)!;
    await gesture(p);
    expect(getByRoleDeep("dialog", { name: "Add task" })).toBeTruthy();
    expect(
      screen.getByRole("radio", { name: "Bottom left quadrant" }),
    ).toBeChecked();
    // hidden until measured, then placed at the tapped spot
    expect(panelStyle().opacity).toBe(0);
    await measurePanel();
    const place = placeQuadrantTaskPanel(
      { x: p.x, y: p.y, width: 0, height: 0 },
      { width: 288, height: 200 },
      BOARD,
    );
    expect(panelStyle()).toMatchObject({
      left: place.x,
      top: place.y,
      opacity: 1,
      width: 288,
    });
    expect(panel()!.props.dataSet.placement).toBe(place.placement);
    await fireEvent.changeText(screen.getByLabelText("Task name"), "Here");
    await fireEvent.press(screen.getByRole("button", { name: "Save" }));
    const [next] = onChange.mock.calls[0]!;
    expect(next[2].label).toBe("Here");
    expect(next[2].x).toBeCloseTo(3, 0);
    expect(next[2].y).toBeCloseTo(3, 0);
  });

  it("edits the selected task in a panel next to it and keeps its other fields", async () => {
    const ref = createRef<ChartHandle>();
    const onChange = vi.fn();
    await mount(<Host ref={ref} onChange={onChange} />);
    await select(0);
    await fireEvent.press(screen.getByRole("button", { name: "Edit task" }));
    const dialog = getByRoleDeep("dialog", { name: "Edit task" });
    expect(dialog.props.dataSet.kind).toBe("edit");
    // anchored at the task
    await measurePanel();
    const at = ref.current!.getController()!.toPixel(2, 8)!;
    const place = placeQuadrantTaskPanel(
      { x: at.x - 10, y: at.y - 10, width: 20, height: 20 },
      { width: 288, height: 200 },
      BOARD,
    );
    expect(panelStyle()).toMatchObject({ left: place.x, top: place.y });
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
    expect(panel()).toBeNull();

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

  it("deletes the selected task after an inline confirmation", async () => {
    const onChange = vi.fn();
    await mount(<Host onChange={onChange} />);
    await select(0);
    await fireEvent.press(screen.getByRole("button", { name: "Delete task" }));
    const confirm = getByRoleDeep("alertdialog", { name: "Delete task" });
    expect(confirm.props.dataSet.kind).toBe("delete");
    expect(
      screen.getByText("“Report” will be removed from the board."),
    ).toBeTruthy();
    await fireEvent.press(screen.getByRole("button", { name: "Cancel" }));
    expect(onChange).not.toHaveBeenCalled();
    expect(panel()).toBeNull();

    await fireEvent.press(screen.getByRole("button", { name: "Delete task" }));
    await fireEvent.press(screen.getByRole("button", { name: "Delete" }));
    expect(onChange).toHaveBeenCalledExactlyOnceWith([initial[1]]);
    expect(panel()).toBeNull();
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
    expect(panel()).toBeNull();
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
    await fireEvent(queryPart("root", "chart")!, "layout", layout(BOARD));
    expect(getByRoleDeep("toolbar", { name: "任务操作" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "编辑任务" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "移除" })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "添加任务 · 左上象限" }),
    ).toBeTruthy();
    await fireEvent.press(screen.getByRole("button", { name: "移除" }));
    expect(getByRoleDeep("alertdialog", { name: "移除" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "删除" })).toBeTruthy();
  });
});
