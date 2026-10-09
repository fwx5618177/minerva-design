import { useState } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as M from "./index";
import { taroComponentManifest } from "./manifest";

describe("native form parity", () => {
  it("checkbox group enforces max and disabled options", () => {
    const change = vi.fn();
    render(
      <M.CheckboxGroup
        max={1}
        onChange={change}
        options={[
          { value: "a", label: "Alpha" },
          { value: "b", label: "Beta" },
          { value: "c", label: "Locked", disabled: true },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole("checkbox", { name: "Alpha" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Beta" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Locked" }));
    expect(change.mock.calls).toEqual([[["a"]]]);
    fireEvent.click(screen.getByRole("checkbox", { name: "Alpha" }));
    expect(change).toHaveBeenLastCalledWith([]);
  });
  it("radio composition selects only one item", () => {
    render(
      <M.RadioGroup defaultValue="a">
        <M.Radio value="a" label="Alpha" />
        <M.Radio value="b" label="Beta" />
      </M.RadioGroup>,
    );
    fireEvent.click(screen.getByRole("radio", { name: "Beta" }));
    expect(screen.getByRole("radio", { name: "Beta" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("radio", { name: "Alpha" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });
  it("number stepper rounds decimals, clamps, and locks read only", () => {
    const change = vi.fn();
    const { rerender } = render(
      <M.NumberInput
        showStepper
        defaultValue={0.1}
        step={0.1}
        max={0.3}
        onChange={change}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Increase" }));
    fireEvent.click(screen.getByRole("button", { name: "Increase" }));
    fireEvent.click(screen.getByRole("button", { name: "Increase" }));
    expect(change.mock.calls).toEqual([[0.2], [0.3]]);
    rerender(
      <M.NumberInput showStepper value={0.2} readOnly onChange={change} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Increase" }));
    expect(change).toHaveBeenCalledTimes(2);
  });
  it("select opens, rejects disabled choices and commits a controlled value", () => {
    function Form() {
      const [value, setValue] = useState("a");
      return (
        <M.Select
          value={value}
          onChange={setValue}
          options={[
            { value: "a", label: "Alpha" },
            { value: "b", label: "Beta" },
            { value: "c", label: "Locked", disabled: true },
          ]}
        />
      );
    }
    render(<Form />);
    fireEvent.click(screen.getByRole("combobox", { name: "Alpha" }));
    fireEvent.click(screen.getByRole("option", { name: "Locked" }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("option", { name: "Beta" }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Beta" })).toBeInTheDocument();
  });
  it("autocomplete filters and selects, cascader commits only leaf paths", () => {
    const select = vi.fn(),
      cascade = vi.fn();
    const { container } = render(
      <>
        <M.AutoComplete
          options={[
            { value: "alpha", label: "Alpha" },
            { value: "beta", label: "Beta" },
          ]}
          onChange={select}
        />
        <M.Cascader
          placeholder="Region"
          onChange={cascade}
          options={[
            {
              value: "cn",
              label: "China",
              children: [{ value: "sh", label: "Shanghai" }],
            },
          ]}
        />
      </>,
    );
    fireEvent.input(container.querySelector("input")!, {
      target: { value: "bet" },
    });
    expect(
      screen.queryByRole("option", { name: "Alpha" }),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("option", { name: "Beta" }));
    expect(select).toHaveBeenLastCalledWith("Beta");
    fireEvent.click(screen.getByRole("button", { name: "Region" }));
    fireEvent.click(screen.getByRole("option", { name: "China" }));
    expect(cascade).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("option", { name: "Shanghai" }));
    expect(cascade).toHaveBeenCalledWith(
      ["cn", "sh"],
      [
        expect.objectContaining({ value: "cn" }),
        expect.objectContaining({ value: "sh" }),
      ],
    );
  });
  it("tag input commits deduplicated values and removes a tag", () => {
    const change = vi.fn();
    const { container } = render(
      <M.TagInput defaultValue={["alpha"]} onChange={change} />,
    );
    fireEvent.input(container.querySelector("input")!, {
      target: { value: "beta" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add tag" }));
    expect(change).toHaveBeenLastCalledWith(["alpha", "beta"]);
    fireEvent.click(screen.getByRole("button", { name: "Remove alpha" }));
    expect(change).toHaveBeenLastCalledWith(["beta"]);
  });
  it("JSON format preserves invalid drafts and formats valid JSON", () => {
    const change = vi.fn();
    const { container } = render(
      <M.JsonField defaultValue={'{"a":1}'} onChange={change} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Format JSON" }));
    expect(change).toHaveBeenLastCalledWith('{\n  "a": 1\n}');
    fireEvent(
      container.querySelector("taro-textarea-core")!,
      new CustomEvent("input", { bubbles: true, detail: { value: "{" } }),
    );
    expect(screen.getByRole("status")).toHaveTextContent("Invalid JSON");
    fireEvent.click(screen.getByRole("button", { name: "Format JSON" }));
    expect(change).toHaveBeenLastCalledWith("{");
  });
  it("key value editor adds, edits and removes rows", () => {
    const change = vi.fn();
    const { container } = render(
      <M.KeyValueEditor
        defaultEntries={[{ key: "name", value: "Ada" }]}
        onChange={change}
      />,
    );
    fireEvent.input(container.querySelectorAll("input")[1], {
      target: { value: "Grace" },
    });
    expect(change).toHaveBeenLastCalledWith([{ key: "name", value: "Grace" }]);
    fireEvent.click(screen.getByRole("button", { name: "Add entry" }));
    expect(container.querySelectorAll("input")).toHaveLength(4);
    fireEvent.click(screen.getAllByRole("button", { name: "Remove entry" })[0]);
    expect(change).toHaveBeenLastCalledWith([
      { id: expect.any(String), key: "", value: "" },
    ]);
  });
  it("rating and steps suppress read only interactions", () => {
    const rating = vi.fn(),
      step = vi.fn();
    render(
      <>
        <M.Rating interactive defaultValue={2} onChange={rating} />
        <M.Steps
          readOnly
          items={[{ title: "First" }, { title: "Second" }]}
          onChange={step}
        />
      </>,
    );
    fireEvent.click(screen.getByRole("radio", { name: "4" }));
    expect(rating).toHaveBeenCalledWith(4);
    fireEvent.click(screen.getByRole("button", { name: "Second" }));
    expect(step).not.toHaveBeenCalled();
  });
});

describe("navigation and overlay parity", () => {
  it("tabs composition changes visible panels and rejects disabled tabs", () => {
    render(
      <M.Tabs defaultValue="a">
        <M.TabList>
          <M.Tab value="a">Alpha</M.Tab>
          <M.Tab value="b">Beta</M.Tab>
          <M.Tab value="c" disabled>
            Locked
          </M.Tab>
        </M.TabList>
        <M.TabPanel value="a">Panel A</M.TabPanel>
        <M.TabPanel value="b">Panel B</M.TabPanel>
      </M.Tabs>,
    );
    fireEvent.click(screen.getByRole("tab", { name: "Beta" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel B");
    fireEvent.click(screen.getByRole("tab", { name: "Locked" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel B");
  });
  it("modal trigger and close button synchronize disclosure state", () => {
    render(
      <M.Modal trigger={<M.Button>Open</M.Button>} title="Settings">
        Body
      </M.Modal>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toHaveTextContent("Body");
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("drawer and popover support compound triggers", () => {
    render(
      <>
        <M.DrawerRoot>
          <M.DrawerTrigger asChild>
            <M.Button>Drawer</M.Button>
          </M.DrawerTrigger>
          <M.DrawerContent>Details</M.DrawerContent>
        </M.DrawerRoot>
        <M.Popover>
          <M.PopoverTrigger>
            <M.Button>Popover</M.Button>
          </M.PopoverTrigger>
          <M.PopoverContent>Hint</M.PopoverContent>
        </M.Popover>
      </>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Drawer" }));
    expect(screen.getByRole("dialog")).toHaveTextContent("Details");
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    fireEvent.click(screen.getByRole("button", { name: "Popover" }));
    expect(screen.getByText("Hint")).toBeInTheDocument();
  });
  it("menu selects an enabled action and closes", () => {
    const select = vi.fn();
    render(
      <M.Menu
        items={[
          { key: "save", label: "Save" },
          { key: "delete", label: "Delete", disabled: true },
        ]}
        onSelect={select}
      >
        <M.Button>Actions</M.Button>
      </M.Menu>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Actions" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Delete" }));
    expect(select).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("menuitem", { name: "Save" }));
    expect(select).toHaveBeenCalledWith({ key: "save", label: "Save" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
  it("confirmation blocks submit while loading and reports cancel", () => {
    const confirm = vi.fn(),
      cancel = vi.fn();
    render(
      <M.ConfirmDialog
        open
        title="Delete?"
        loading
        onConfirm={confirm}
        onCancel={cancel}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(confirm).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(cancel).not.toHaveBeenCalled();
  });
  it("command filters actions before selecting", () => {
    const select = vi.fn();
    const { container } = render(
      <M.CommandDialog
        open
        items={[
          { id: "save", label: "Save", onSelect: select },
          { id: "close", label: "Close" },
        ]}
      />,
    );
    fireEvent.input(container.querySelector("input")!, {
      target: { value: "sav" },
    });
    expect(
      screen.queryByRole("option", { name: "Close" }),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("option", { name: "Save" }));
    expect(select).toHaveBeenCalledTimes(1);
  });
});

describe("data and presentation parity", () => {
  it("table cycles sort and excludes disabled rows from select all", () => {
    const select = vi.fn();
    render(
      <M.Table
        columns={[{ key: "name", header: "Name", sortable: true }]}
        data={[
          { id: "b", name: "Beta" },
          { id: "a", name: "Alpha" },
        ]}
        rowKey={(r) => r.id}
        rowSelection={{
          onChange: select,
          getCheckboxProps: (r) => ({ disabled: r.id === "b" }),
        }}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Name/ }));
    const rows = screen.getAllByRole("row");
    expect(within(rows[1]).getByText("Alpha")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox", { name: "Select all rows" }));
    expect(select).toHaveBeenCalledWith(["a"], [{ id: "a", name: "Alpha" }]);
  });
  it("pagination clamps changes and disables previous at first page", () => {
    const change = vi.fn();
    render(<M.Pagination total={25} pageSize={10} onChange={change} />);
    fireEvent.click(screen.getByRole("button", { name: "Previous page" }));
    expect(change).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(change).toHaveBeenCalledWith(2, 10);
  });
  it("calendar handles month rollover and selects an event day", () => {
    const month = vi.fn(),
      select = vi.fn();
    render(
      <M.MonthCalendar
        defaultMonth={new Date(2025, 11, 1)}
        onMonthChange={month}
        onChange={select}
        events={[{ id: "x", date: "2025-12-12", title: "Review" }]}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "2025-12-12, 1 event" }),
    );
    expect(select).toHaveBeenCalledWith("2025-12-12");
    expect(screen.getByText("Review")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(month.mock.calls[0][0]).toEqual(new Date(2026, 0, 1));
  });
  it("virtual list renders a bounded window and advances on scroll", () => {
    const { container } = render(
      <M.VirtualList
        items={Array.from({ length: 100 }, (_, i) => i)}
        itemHeight={40}
        maxHeight={120}
        overscan={1}
        renderItem={(n) => <M.Box>Row {n}</M.Box>}
      />,
    );
    expect(screen.getByText("Row 0")).toBeInTheDocument();
    expect(screen.queryByText("Row 50")).not.toBeInTheDocument();
    const scroll = container.querySelector(".mn-virtual-list")!;
    fireEvent.scroll(scroll, { target: { scrollTop: 400 } });
    expect(screen.getByText("Row 10")).toBeInTheDocument();
    expect(screen.queryByText("Row 0")).not.toBeInTheDocument();
  });
  it("alert collapses and closes, tag remove does not toggle", () => {
    const toggle = vi.fn(),
      close = vi.fn();
    render(
      <>
        <M.Alert title="Notice" collapsible closable>
          Details
        </M.Alert>
        <M.Tag closable clickable onClick={toggle} onClose={close}>
          Alpha
        </M.Tag>
      </>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Collapse" }));
    expect(screen.queryByText("Details")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Remove Alpha" }));
    expect(close).toHaveBeenCalledTimes(1);
    expect(toggle).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
  it("standalone Textarea edits source and HTML preview discloses browser capability limits", () => {
    const { container } = render(
      <>
        <M.Textarea value="const x = 1" />
        <M.HtmlPreview html={"<script>danger()</script><p>Hello</p>"} />
      </>,
    );
    expect(container.querySelector("taro-textarea-core")).toHaveAttribute(
      "value",
      "const x = 1",
    );
    expect(container.querySelector("script")).toBeNull();
    expect(document.querySelector("iframe")).toHaveAttribute("sandbox", "");
  });
});

it("only explicitly unsupported Monaco is absent; every applicable native manifest export remains present", () => {
  for (const entry of taroComponentManifest) {
    if (entry.name === "MonacoCodeEditor") {
      expect((entry as { status?: string }).status).toBe("n/a");
      expect(entry.limitations.join(" ")).toContain("Textarea");
      expect(entry.name in M).toBe(false);
    } else {
      expect(entry.name in M, entry.name).toBe(true);
    }
  }
});
