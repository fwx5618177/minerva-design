import { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text, View } from "react-native";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { getByRoleDeep, queryAllByRoleDeep } from "../../../test/queries";
import {
  DashboardColumns,
  DashboardCard,
  DashboardColumn,
  type DashboardColumnsProps,
} from "./DashboardColumns";

describe("DashboardColumns (native)", () => {
  it("renders a labelled region of columns", async () => {
    await render(
      <DashboardColumns>
        <DashboardColumn title="To do" count={2}>
          <Text>Write spec</Text>
          <Text>Review</Text>
        </DashboardColumn>
        <DashboardColumn title="Done" />
      </DashboardColumns>,
    );
    expect(getByRoleDeep("region", { name: "Board" })).toBeTruthy();
    const todo = getByRoleDeep("group", { name: "To do, 2 items" });
    expect(todo.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ width: 288 })]),
    );
    expect(getByRoleDeep("list")).toBeTruthy();
    expect(queryAllByRoleDeep("listitem")).toHaveLength(2);
    expect(screen.getByText("Write spec")).toBeTruthy();
    expect(getByRoleDeep("group", { name: "Done" })).toBeTruthy();
    expect(screen.getByText("No items")).toBeTruthy();
  });

  it("uses columnWidth, a custom label and snaps by column", async () => {
    await render(
      <DashboardColumns accessibilityLabel="Sprint" columnWidth={200} gap={8}>
        <DashboardColumn title="To do" />
      </DashboardColumns>,
    );
    const board = getByRoleDeep("region", { name: "Sprint" });
    expect(board.props.snapToInterval).toBe(208);
    expect(getByRoleDeep("group", { name: "To do" }).props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ width: 200 })]),
    );
  });

  it("renders the count, description, actions, empty and footer", async () => {
    await render(
      <DashboardColumn
        title="Ideas"
        count={1}
        description="Not triaged"
        actions={<Text>Add</Text>}
        empty={<Text>Nothing yet</Text>}
        footer={<Text>Add card</Text>}
        color="success"
      />,
    );
    expect(getByRoleDeep("group", { name: "Ideas, 1 item" })).toBeTruthy();
    expect(screen.getByText("Not triaged")).toBeTruthy();
    expect(screen.getByText("Add")).toBeTruthy();
    expect(screen.getByText("Nothing yet")).toBeTruthy();
    expect(screen.getByText("Add card")).toBeTruthy();
    expect(screen.queryByText("No items")).toBeNull();
    const column = getByRoleDeep("group", { name: "Ideas, 1 item" });
    expect(column.props.dataSet).toMatchObject({
      minerva: "dashboard-column",
      color: "success",
    });
  });

  it("translates the labels", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <DashboardColumns>
          <DashboardColumn title="待办" count={3} />
        </DashboardColumns>
      </MinervaProvider>,
    );
    expect(getByRoleDeep("region", { name: "分栏面板" })).toBeTruthy();
    expect(getByRoleDeep("group", { name: "待办，3 项" })).toBeTruthy();
    expect(screen.getByText("暂无项目")).toBeTruthy();
  });
});

describe("DashboardColumns drag and drop (native)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  /** "todo" (a, b) and "done" (c); the views carry their key as testID */
  const renderBoard = async (props: Partial<DashboardColumnsProps> = {}) => {
    const onCardMove = vi.fn();
    await render(
      <DashboardColumns draggable onCardMove={onCardMove} {...props}>
        <DashboardColumn title="To do" value="todo" testID="todo">
          <DashboardCard value="a" testID="a">
            <Text>Write spec</Text>
          </DashboardCard>
          <DashboardCard value="b" label="Review the spec" testID="b">
            <Text>Review</Text>
          </DashboardCard>
        </DashboardColumn>
        <DashboardColumn title="Done" value="done" testID="done">
          <DashboardCard value="c" label="Ship" testID="c">
            <Text>Ship</Text>
          </DashboardCard>
        </DashboardColumn>
      </DashboardColumns>,
    );
    return { onCardMove };
  };

  const actionsOf = (testID: string) =>
    (
      screen.getByTestId(testID).props.accessibilityActions as {
        name: string;
        label: string;
      }[]
    ).map((action) => `${action.name}: ${action.label}`);

  it("renders plain cards unless the board is draggable", async () => {
    await render(
      <DashboardColumns>
        <DashboardColumn title="To do" value="todo">
          <DashboardCard value="a" testID="a">
            <Text>Write spec</Text>
          </DashboardCard>
        </DashboardColumn>
      </DashboardColumns>,
    );
    const card = screen.getByTestId("a");
    expect(card.props.accessible).toBeUndefined();
    expect(card.props.accessibilityActions).toBeUndefined();
    expect(card.props.dataSet).toMatchObject({ minerva: "dashboard-card" });
  });

  it("offers the possible moves as accessibility actions", async () => {
    await renderBoard();
    expect(screen.getByTestId("a").props.accessible).toBe(true);
    expect(actionsOf("a")).toEqual([
      "moveDown: Move down",
      "moveNext: Move to Done",
    ]);
    expect(actionsOf("b")).toEqual([
      "moveUp: Move up",
      "moveNext: Move to Done",
    ]);
    expect(actionsOf("c")).toEqual(["movePrevious: Move to To do"]);
    expect(screen.getByTestId("b").props.accessibilityLabel).toBe(
      "Review the spec",
    );
  });

  it("reports the move of an accessibility action", async () => {
    const { onCardMove } = await renderBoard();
    await fireEvent(screen.getByTestId("b"), "accessibilityAction", {
      nativeEvent: { actionName: "moveNext" },
    });
    expect(onCardMove).toHaveBeenCalledExactlyOnceWith({
      cardKey: "b",
      fromColumn: "todo",
      fromIndex: 1,
      toColumn: "done",
      toIndex: 1,
    });
    await fireEvent(screen.getByTestId("a"), "accessibilityAction", {
      nativeEvent: { actionName: "moveDown" },
    });
    expect(onCardMove).toHaveBeenLastCalledWith(
      expect.objectContaining({ cardKey: "a", toColumn: "todo", toIndex: 1 }),
    );
  });

  it("leaves out the moves canDrop refuses", async () => {
    const { onCardMove } = await renderBoard({
      canDrop: (move) => move.toColumn === move.fromColumn,
    });
    expect(actionsOf("a")).toEqual(["moveDown: Move down"]);
    expect(actionsOf("c")).toEqual([]);
    await fireEvent(screen.getByTestId("c"), "accessibilityAction", {
      nativeEvent: { actionName: "movePrevious" },
    });
    expect(onCardMove).not.toHaveBeenCalled();
  });

  it("moves a card with a long press and drag", async () => {
    // columns 200 wide at x 0 / 220, cards 50 high from y 40
    const rects: Record<string, [number, number, number, number]> = {
      todo: [0, 0, 200, 400],
      done: [220, 0, 200, 400],
      a: [0, 40, 200, 50],
      b: [0, 100, 200, 50],
      c: [220, 40, 200, 50],
    };
    vi.spyOn(
      View.prototype as unknown as { measure: () => void },
      "measure",
    ).mockImplementation(function (
      this: { props: { testID?: string } },
      ...args: unknown[]
    ) {
      const callback = args[0] as (...values: number[]) => void;
      const [x, y, width, height] = rects[this.props.testID ?? ""] ?? [
        0, 0, 0, 0,
      ];
      callback(0, 0, width, height, x, y);
    });
    const { onCardMove } = await renderBoard();
    const card = screen.getByTestId("a");
    const touch = (pageX: number, pageY: number) => ({
      nativeEvent: { pageX, pageY, touches: [{}] },
    });
    await fireEvent(card, "touchStart", touch(100, 60));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 450));
    });
    expect(screen.getByTestId("a").props.style).toEqual(
      expect.arrayContaining([{ opacity: 0.4 }]),
    );
    expect(getByRoleDeep("region").props.scrollEnabled).toBe(false);
    await fireEvent(screen.getByTestId("a"), "touchMove", touch(300, 120));
    const border = (testID: string) =>
      (screen.getByTestId(testID).props.style as [{ borderColor: string }])[0]
        .borderColor;
    // the target column is highlighted
    expect(border("done")).not.toBe(border("todo"));
    await fireEvent(screen.getByTestId("a"), "touchEnd", touch(300, 120));
    expect(onCardMove).toHaveBeenCalledExactlyOnceWith({
      cardKey: "a",
      fromColumn: "todo",
      fromIndex: 0,
      toColumn: "done",
      toIndex: 1,
    });
    expect(getByRoleDeep("region").props.scrollEnabled).toBe(true);
  });

  it("does not pick a card up when the finger moves first (a scroll)", async () => {
    const { onCardMove } = await renderBoard();
    const card = screen.getByTestId("a");
    await fireEvent(card, "touchStart", {
      nativeEvent: { pageX: 100, pageY: 60, touches: [{}] },
    });
    await fireEvent(card, "touchMove", {
      nativeEvent: { pageX: 100, pageY: 90, touches: [{}] },
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 450));
    });
    expect(getByRoleDeep("region").props.scrollEnabled).toBe(true);
    await fireEvent(card, "touchEnd", {
      nativeEvent: { pageX: 100, pageY: 90, touches: [] },
    });
    expect(onCardMove).not.toHaveBeenCalled();
  });
});
