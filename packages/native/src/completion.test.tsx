import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { describe, expect, it, vi } from "vitest";
import * as Native from "./index";

const rows = [
  { id: "a", name: "Zulu", score: 2 },
  { id: "b", name: "Alpha", score: 1 },
];
describe("native completion", () => {
  it("exports functional native counterparts", () => {
    for (const name of [
      "Table",
      "DataTable",
      "VirtualList",
      "Upload",
      "AutoComplete",
      "Cascader",
      "CommandDialog",
      "Menu",
      "ContextMenu",
      "Popover",
      "PopoverTrigger",
      "PopoverContent",
      "PopoverClose",
      "Tooltip",
    ])
      expect(Native).toHaveProperty(name);
  });
  it("sorts and selects table rows without mutating source data", async () => {
    const change = vi.fn();
    await render(
      <Native.Table
        data={rows}
        columns={[{ key: "name", header: "Name", sortable: true }]}
        rowKey={(r) => r.id}
        rowSelection={{ onChange: change }}
      />,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Name" }));
    expect(
      screen.getAllByText(/Alpha|Zulu/).map((n) => n.props.children),
    ).toEqual(["Alpha", "Zulu"]);
    await fireEvent.press(
      screen.getByRole("checkbox", { name: "Select row b" }),
    );
    expect(change).toHaveBeenLastCalledWith(["b"], [rows[1]]);
    expect(rows[0].name).toBe("Zulu");
  });
  it("renders data errors with a working retry", async () => {
    const retry = vi.fn();
    await render(
      <Native.DataTable
        data={[]}
        columns={[]}
        error="Offline"
        onRetry={retry}
      />,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Retry" }));
    expect(retry).toHaveBeenCalledOnce();
  });
  it("virtualizes a long list and activates a row", async () => {
    const click = vi.fn();
    await render(
      <Native.VirtualList
        items={Array.from({ length: 1000 }, (_, id) => ({ id }))}
        maxHeight={200}
        itemHeight={40}
        renderItem={(item) => <Text>Row {item.id}</Text>}
        onItemClick={click}
      />,
    );
    expect(screen.queryByText("Row 999")).toBeNull();
    await fireEvent.press(screen.getByRole("button", { name: "Row 0" }));
    expect(click.mock.calls[0]?.[0]).toEqual({ id: 0 });
  });
  it("filters autocomplete and commits the picked label", async () => {
    const select = vi.fn();
    await render(
      <Native.AutoComplete
        label="Fruit"
        options={[
          { value: 1, label: "Apple" },
          { value: 2, label: "Banana" },
        ]}
        onSelect={select}
      />,
    );
    await fireEvent.changeText(screen.getByLabelText("Fruit"), "app");
    expect(screen.queryByText("Banana")).toBeNull();
    await fireEvent.press(screen.getByRole("button", { name: "Apple" }));
    expect(screen.getByLabelText("Fruit").props.value).toBe("Apple");
    expect(select).toHaveBeenCalledWith({ value: 1, label: "Apple" });
  });
  it("navigates cascader branches and commits a full leaf path", async () => {
    const change = vi.fn();
    await render(
      <Native.Cascader
        label="Region"
        options={[
          {
            value: "cn",
            label: "China",
            children: [{ value: "sh", label: "Shanghai" }],
          },
        ]}
        onChange={change}
      />,
    );
    await fireEvent.press(screen.getByRole("combobox", { name: "Region" }));
    await fireEvent.press(screen.getByRole("button", { name: "China" }));
    await fireEvent.press(screen.getByRole("button", { name: "Shanghai" }));
    expect(change.mock.calls[0]?.[0]).toEqual(["cn", "sh"]);
  });
  it("searches command metadata and invokes an enabled command", async () => {
    const select = vi.fn();
    const opened = vi.fn();
    await render(
      <Native.CommandDialog
        defaultOpen
        items={[
          { id: "a", title: "Settings", keywords: "preferences" },
          { id: "b", title: "Hidden", disabled: true },
        ]}
        onSelect={select}
        onOpenChange={opened}
      />,
    );
    await fireEvent.changeText(
      screen.getByLabelText("Search commands"),
      "pref",
    );
    expect(screen.queryByText("Hidden")).toBeNull();
    await fireEvent.press(screen.getByRole("button", { name: "Settings" }));
    expect(select).toHaveBeenCalledWith({
      id: "a",
      title: "Settings",
      keywords: "preferences",
    });
    expect(opened).toHaveBeenCalledWith(false);
  });
  it("opens a menu, toggles a checkbox, navigates a submenu and selects", async () => {
    const checked = vi.fn();
    const select = vi.fn();
    await render(
      <Native.Menu
        items={[
          {
            type: "checkbox",
            key: "check",
            label: "Show grid",
            onCheckedChange: checked,
          },
          {
            key: "more",
            label: "More",
            children: [{ key: "save", label: "Save" }],
          },
        ]}
        onSelect={select}
      >
        <Native.Button>Actions</Native.Button>
      </Native.Menu>,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Actions" }));
    await fireEvent.press(screen.getByRole("checkbox", { name: "Show grid" }));
    expect(checked).toHaveBeenCalledWith(true);
    await fireEvent.press(screen.getByRole("button", { name: "More" }));
    await fireEvent.press(screen.getByRole("button", { name: "Save" }));
    expect(select).toHaveBeenCalledWith({ key: "save", label: "Save" });
  });
  it("opens and closes a composed popover", async () => {
    const change = vi.fn();
    await render(
      <Native.Popover onOpenChange={change}>
        <Native.PopoverTrigger>Details</Native.PopoverTrigger>
        <Native.PopoverContent accessibilityLabel="Details">
          <Text>Panel body</Text>
          <Native.PopoverClose>Done</Native.PopoverClose>
        </Native.PopoverContent>
      </Native.Popover>,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Details" }));
    expect(screen.getByText("Panel body")).toBeTruthy();
    await fireEvent.press(screen.getByRole("button", { name: "Done" }));
    expect(change).toHaveBeenLastCalledWith(false);
  });
  it("shows a tooltip using long press and dismisses on press", async () => {
    await render(
      <Native.Tooltip content="Helpful">
        <Native.Button>Help</Native.Button>
      </Native.Tooltip>,
    );
    await fireEvent(screen.getByRole("button", { name: "Help" }), "longPress");
    expect(screen.getByText("Helpful")).toBeTruthy();
    await fireEvent.press(screen.getByRole("button", { name: "Help" }));
    expect(screen.queryByText("Helpful")).toBeNull();
  });
  it("validates selected native files before emitting and supports retry/remove", async () => {
    const selected = vi.fn();
    const retry = vi.fn();
    const remove = vi.fn();
    const pick = vi.fn().mockResolvedValue([
      {
        uri: "file:///a.pdf",
        name: "a.pdf",
        mimeType: "application/pdf",
        size: 10,
      },
    ]);
    const view = await render(
      <Native.Upload
        label="Attachment"
        value={[]}
        pickFiles={pick}
        onFilesSelected={selected}
        accept="image/*"
      />,
    );
    await act(async () => {
      await fireEvent.press(
        screen.getByRole("button", { name: "Select files" }),
      );
    });
    expect(selected).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toBeTruthy();
    await view.rerender(
      <Native.Upload
        label="Attachment"
        value={[{ id: "a", name: "a.pdf", status: "error" }]}
        pickFiles={pick}
        onFilesSelected={selected}
        onRetry={retry}
        onRemove={remove}
      />,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Retry a.pdf" }));
    await fireEvent.press(screen.getByRole("button", { name: "Remove a.pdf" }));
    expect(retry).toHaveBeenCalledOnce();
    expect(remove).toHaveBeenCalledOnce();
  });
});
