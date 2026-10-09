import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import * as M from "./index";
import Taro from "@tarojs/taro";
import { resolveTokens } from "@minerva/core";
it("Input invokes onClear, keeps a refused controlled value and hides clear when locked", () => {
  const clear = vi.fn(),
    change = vi.fn();
  const { rerender } = render(
    <M.Input value="Owner" clearable onClear={clear} onChange={change} />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Clear" }));
  expect(clear).toHaveBeenCalledTimes(1);
  expect(change).toHaveBeenCalledWith("");
  expect(screen.getByRole("textbox")).toHaveValue("Owner");
  rerender(<M.Input value="Owner" clearable disabled onClear={clear} />);
  expect(screen.queryByRole("button", { name: "Clear" })).toBeNull();
});
it("Modal exposes Close, default button trigger, ReactNode title and omitted empty description", () => {
  const changed = vi.fn();
  const { rerender } = render(
    <M.ModalRoot defaultOpen>
      <M.ModalContent>
        <M.ModalHeader>Compound title</M.ModalHeader>
        <M.ModalClose>Done</M.ModalClose>
      </M.ModalContent>
    </M.ModalRoot>,
  );
  expect(screen.getByRole("dialog")).not.toHaveAttribute("aria-describedby");
  fireEvent.click(screen.getByRole("button", { name: "Done" }));
  expect(screen.queryByRole("dialog")).toBeNull();
  rerender(
    <M.Modal open title={<span>Composed title</span>} onOpenChange={changed} />,
  );
  expect(screen.getByRole("dialog", { name: "Composed title" })).toBeVisible();
});
it("disclosure triggers and closes compose callbacks, disabled and cancellation", () => {
  const request = vi.fn();
  render(
    <M.DrawerRoot open onOpenChange={request}>
      <M.DrawerContent>
        <M.DrawerClose
          asChild
          className="parent"
          onClick={(event) => event.preventDefault()}
        >
          <M.Button className="child">Keep open</M.Button>
        </M.DrawerClose>
        <M.DrawerClose disabled>Disabled close</M.DrawerClose>
      </M.DrawerContent>
    </M.DrawerRoot>,
  );
  const close = screen.getByRole("button", { name: "Keep open" });
  expect(close).toHaveClass("parent", "child");
  fireEvent.click(close);
  fireEvent.click(screen.getByRole("button", { name: "Disabled close" }));
  expect(request).not.toHaveBeenCalled();
});
it("Switch consumes custom and segmented size/color/style and emits native events", () => {
  const changed = vi.fn();
  const { container, rerender } = render(
    <M.Switch
      label="Lights"
      size="large"
      shape="square"
      color="danger"
      icon="*"
      style={{ margin: 11 }}
      onChange={changed}
    />,
  );
  const control = screen.getByRole("switch", { name: "Lights" });
  expect(control).toHaveClass("mn-size-large", "mn-shape-square");
  fireEvent.click(control);
  expect(changed).toHaveBeenCalledWith(true, expect.any(Object));
  expect(container.firstElementChild).toHaveStyle({ margin: "11px" });
  rerender(
    <M.Switch
      variant="segmented"
      size="small"
      color="success"
      offLabel="Off"
      onLabel="On"
      aria-label="State"
    />,
  );
  expect(screen.getByRole("group", { name: "State" })).toHaveClass(
    "mn-size-small",
    "mn-color-success",
  );
});
it("Select applies trigger props, option classes and only submits its owner value", () => {
  const changed = vi.fn();
  const { container } = render(
    <M.Select
      value="a"
      defaultOpen
      name="choice"
      id="choice-trigger"
      size="large"
      invalid
      required
      style={{ width: 220 }}
      onChange={changed}
    >
      <M.SelectItem value="a" className="selected-option">
        Alpha
      </M.SelectItem>
      <M.SelectItem value="b">Beta</M.SelectItem>
    </M.Select>,
  );
  const trigger = screen.getByRole("combobox");
  expect(trigger).toHaveAttribute("id", "choice-trigger");
  expect(trigger).toHaveAttribute("aria-invalid", "true");
  expect(trigger).toHaveAttribute("aria-required", "true");
  expect(trigger).toHaveClass("mn-size-large");
  expect(trigger).toHaveStyle({ width: "220px" });
  expect(screen.getByRole("option", { name: "Alpha" })).toHaveClass(
    "selected-option",
  );
  fireEvent.click(screen.getByRole("option", { name: "Beta" }));
  expect(changed).toHaveBeenCalledWith("b");
  expect(container.querySelector('input[name="choice"]')).toHaveValue("a");
});
it("TagInput native named group contains committed tags, never the draft", () => {
  const { container } = render(
    <M.TagInput name="tags" value={["alpha", "beta"]} />,
  );
  fireEvent.input(screen.getByRole("textbox"), { target: { value: "draft" } });
  const group = container.querySelector(
    'taro-checkbox-group-core[name="tags"]',
  );
  expect(group).not.toBeNull();
  expect(group?.querySelectorAll("taro-checkbox-core")).toHaveLength(2);
  expect(screen.getByRole("textbox")).not.toHaveAttribute("name", "tags");
});
it("Table honors loadingRows and disables select-all while busy", () => {
  const { container, rerender } = render(
    <M.Table
      loading
      loadingRows={3}
      data={[{ id: "one" }]}
      columns={[{ key: "id", header: "ID" }]}
      rowSelection={{}}
    />,
  );
  expect(
    container.querySelectorAll(".mn-table__body .mn-table__row"),
  ).toHaveLength(3);
  expect(container.querySelectorAll(".mn-table-skeleton")).toHaveLength(3);
  expect(
    screen.getByRole("checkbox", { name: "Select all rows" }),
  ).toHaveAttribute("aria-disabled", "true");
  rerender(
    <M.Table
      loading
      loadingRows={1}
      data={[]}
      columns={[{ key: "id", header: "ID" }]}
    />,
  );
  expect(
    container.querySelectorAll(".mn-table__body .mn-table__row"),
  ).toHaveLength(1);
});
it("MonthCalendar applies size, sorts range ends and navigates after selecting an outside day", () => {
  const month = vi.fn();
  const { container } = render(
    <M.MonthCalendar
      defaultMonth={new Date(2026, 9, 1)}
      size="large"
      rangeStart="2026-10-09"
      rangeEnd="2026-10-07"
      onMonthChange={month}
    />,
  );
  expect(container.firstElementChild).toHaveClass("mn-size-large");
  expect(screen.getByRole("button", { name: "2026-10-08" })).toHaveClass(
    "mn-in-range",
  );
  fireEvent.click(screen.getByRole("button", { name: "2026-09-30" }));
  expect(month).toHaveBeenCalledWith(new Date(2026, 8, 1));
});
it("ConfirmDialog uses destructive color and localized Delete default with ReactNode labels", () => {
  const { rerender } = render(
    <M.ConfirmDialog open color="danger" title="Delete record?" />,
  );
  expect(screen.getByRole("button", { name: "Delete" })).toHaveClass(
    "mn-color-danger",
  );
  rerender(
    <M.ConfirmDialog
      open
      color="warning"
      title="Proceed?"
      confirmLabel={<span>Proceed now</span>}
    />,
  );
  expect(screen.getByRole("button", { name: "Proceed now" })).toHaveClass(
    "mn-color-warning",
  );
});
it("Menu consumes size and native placement and keeps controlled outside dismissal with owner", () => {
  const change = vi.fn();
  const { container } = render(
    <M.Menu
      open
      onOpenChange={change}
      size="small"
      side="left"
      align="start"
      items={[{ key: "one", label: "One" }]}
    >
      <M.Button>Actions</M.Button>
    </M.Menu>,
  );
  const menu = screen.getByRole("menu");
  expect(menu).toHaveClass("mn-size-small");
  expect(menu).toHaveAttribute("data-side", "left");
  fireEvent.click(container.querySelector(".mn-menu-backdrop")!);
  expect(change).toHaveBeenCalledWith(false);
  expect(menu).toBeVisible();
});
it("Menu respects a disabled or cancelled composed trigger, and ContextMenu ignores ordinary taps", () => {
  const requested = vi.fn();
  const { rerender, container } = render(
    <M.Menu disabled onOpenChange={requested} items={[]}>
      <M.Button>Locked menu</M.Button>
    </M.Menu>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Locked menu" }));
  expect(requested).not.toHaveBeenCalled();
  rerender(
    <M.Menu onOpenChange={requested} items={[]}>
      <M.Button onClick={(event) => event.preventDefault()}>
        Cancelled menu
      </M.Button>
    </M.Menu>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Cancelled menu" }));
  expect(requested).not.toHaveBeenCalled();
  rerender(
    <M.ContextMenu items={[{ key: "edit", label: "Edit" }]}>
      <M.Button>Context target</M.Button>
    </M.ContextMenu>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Context target" }));
  expect(screen.queryByRole("menu")).toBeNull();
  expect(container).not.toBeEmptyDOMElement();
});

it("native confirm applies its semantic button color and rejects composed labels without a provider", async () => {
  const native = vi
    .spyOn(Taro, "showModal")
    .mockResolvedValue({ errMsg: "ok", confirm: true, cancel: false });
  await M.confirm({ title: "Delete?", color: "danger" });
  expect(native).toHaveBeenCalledWith(
    expect.objectContaining({
      confirmText: "Delete",
      confirmColor: resolveTokens().colors["danger-color"],
    }),
  );
  await expect(
    M.confirm({ title: "Delete?", confirmLabel: <span>Delete</span> }),
  ).rejects.toThrow("ConfirmProvider");
});
it("ContextMenu honors its declared defaultOpen extension", () => {
  render(
    <M.ContextMenu defaultOpen items={[{ key: "one", label: "One" }]}>
      <M.Button>Context</M.Button>
    </M.ContextMenu>,
  );
  expect(screen.getByRole("menu")).toBeVisible();
});

it("Input applies its public class and variant/size to the wrapper around every adornment", () => {
  const { container, rerender } = render(
    <M.Input
      prefix="@"
      className="owner-field"
      variant="filled"
      size="small"
    />,
  );
  expect(container.firstElementChild).toHaveClass(
    "owner-field",
    "mn-variant-filled",
    "mn-size-small",
  );
  expect(screen.getByRole("textbox")).not.toHaveClass("owner-field");
  rerender(<M.Input className="owner-field" invalid />);
  expect(container.firstElementChild).toHaveClass("owner-field", "mn-invalid");
});
