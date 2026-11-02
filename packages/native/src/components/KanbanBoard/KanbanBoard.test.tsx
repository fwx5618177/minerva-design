import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { describe, expect, it } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { getByRoleDeep, queryAllByRoleDeep } from "../../../test/queries";
import { KanbanBoard, KanbanColumn } from "./KanbanBoard";

describe("KanbanBoard (native)", () => {
  it("renders a labelled region of columns", async () => {
    await render(
      <KanbanBoard>
        <KanbanColumn title="To do" count={2}>
          <Text>Write spec</Text>
          <Text>Review</Text>
        </KanbanColumn>
        <KanbanColumn title="Done" />
      </KanbanBoard>,
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
      <KanbanBoard accessibilityLabel="Sprint" columnWidth={200} gap={8}>
        <KanbanColumn title="To do" />
      </KanbanBoard>,
    );
    const board = getByRoleDeep("region", { name: "Sprint" });
    expect(board.props.snapToInterval).toBe(208);
    expect(getByRoleDeep("group", { name: "To do" }).props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ width: 200 })]),
    );
  });

  it("renders the count, description, actions, empty and footer", async () => {
    await render(
      <KanbanColumn
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
      minerva: "kanban-column",
      color: "success",
    });
  });

  it("translates the labels", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <KanbanBoard>
          <KanbanColumn title="待办" count={3} />
        </KanbanBoard>
      </MinervaProvider>,
    );
    expect(getByRoleDeep("region", { name: "看板" })).toBeTruthy();
    expect(getByRoleDeep("group", { name: "待办，3 项" })).toBeTruthy();
    expect(screen.getByText("暂无项目")).toBeTruthy();
  });
});
