import { Component } from "@angular/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, settle, user } from "./testing";
import {
  MnAvatar,
  MnIconButton,
  MnTag,
  MnTabs,
  MnTab,
  MnTabPanel,
  MnPagination,
  MnJsonField,
  MnKeyValueEditor,
  MnVirtualList,
  MnMonthCalendar,
  MnDataTable,
  MnCommandDialog,
  MnMenu,
  MnTooltip,
  MnAlert,
  MnToastService,
} from "./index";
import { TestBed } from "@angular/core/testing";

@Component({
  imports: [MnTabs, MnTab, MnTabPanel],
  template: `<mn-tabs [(value)]="value"
    ><mn-tab value="one">One</mn-tab
    ><mn-tab value="blocked" disabled>Blocked</mn-tab
    ><mn-tab value="two">Two</mn-tab
    ><mn-tab-panel value="one">First panel</mn-tab-panel
    ><mn-tab-panel value="two">Second panel</mn-tab-panel></mn-tabs
  >`,
})
class TabsHost {
  value = "one";
}
@Component({
  imports: [MnIconButton, MnTag, MnAvatar],
  template: `<button mnIconButton label="Pin" toggle [(pressed)]="pressed">
      ★</button
    ><mn-tag
      label="Filter"
      clickable
      closable
      [(active)]="active"
      (removed)="removed = true"
    /><mn-avatar name="Ada Lovelace" src="/missing.png" />`,
})
class FoundationHost {
  pressed = false;
  active = false;
  removed = false;
}
@Component({
  imports: [MnPagination],
  template: `<mn-pagination
    [total]="95"
    [(page)]="page"
    showJumper
    showSizeChanger
    [(pageSize)]="pageSize"
  />`,
})
class PaginationHost {
  page = 1;
  pageSize = 10;
}
@Component({
  imports: [MnJsonField, MnKeyValueEditor],
  template: `<mn-json-field [(value)]="json" /><mn-key-value-editor
      [(value)]="rows"
    />`,
})
class EditorHost {
  json = '{"number":9007199254740993,"a":1,"a":2}';
  rows = [{ key: "one", value: "1" }];
}
@Component({
  imports: [MnVirtualList],
  template: `<mn-virtual-list
    [items]="items"
    [height]="100"
    [itemHeight]="20"
    [overscan]="1"
  />`,
})
class VirtualHost {
  items = Array.from({ length: 1000 }, (_, i) => `Row ${i}`);
}
@Component({
  imports: [MnMonthCalendar],
  template: `<mn-month-calendar
    [month]="month"
    [(value)]="value"
    today="2026-10-09"
  />`,
})
class CalendarHost {
  month = new Date(2026, 9, 1);
  value = "2026-10-09";
}
@Component({
  imports: [MnDataTable],
  template: `<mn-data-table
    [rows]="rows"
    [columns]="columns"
    selectable
    [(selection)]="selection"
  />`,
})
class TableHost {
  rows = [
    { id: "1", name: "Zoe" },
    { id: "2", name: "Ada" },
  ];
  columns = [{ key: "name", header: "Name", sortable: true }];
  selection: readonly string[] = [];
}
@Component({
  imports: [MnCommandDialog],
  template: `<mn-command-dialog
    [(open)]="open"
    [items]="items"
    (selected)="selected = $event.id"
  />`,
})
class CommandHost {
  open = true;
  items = [
    { id: "open", label: "Open file" },
    { id: "save", label: "Save file" },
  ];
  selected = "";
}
@Component({
  imports: [MnMenu],
  template: `<mn-menu
    label="Actions"
    [items]="items"
    (selected)="selected = $event.id"
  />`,
})
class MenuHost {
  items = [
    { id: "disabled", label: "Disabled", disabled: true },
    { id: "edit", label: "Edit" },
    { id: "delete", label: "Delete" },
  ];
  selected = "";
}
@Component({
  imports: [MnTooltip],
  template: `<mn-tooltip text="Useful help"
    ><button>Target</button></mn-tooltip
  >`,
})
class TooltipHost {}
@Component({
  imports: [MnAlert],
  template: `<mn-alert
    title="Notice"
    description="Details"
    collapsible
    closable
  />`,
})
class AlertHost {}
afterEach(() => vi.restoreAllMocks());

describe("new Angular component user flows", () => {
  it("moves tabs past disabled items and links the active panel", async () => {
    const f = await render(TabsHost);
    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();
    await user().keyboard("{ArrowRight}");
    expect(f.componentInstance.value).toBe("two");
    expect(tabs[2]).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Second panel");
    expect(screen.getByRole("tabpanel")).toHaveAttribute(
      "aria-labelledby",
      tabs[2].id,
    );
  });
  it("toggles button and tag, removes tag, and falls back after an avatar error", async () => {
    const f = await render(FoundationHost);
    await user().click(screen.getByRole("button", { name: "Pin" }));
    await user().click(screen.getByRole("button", { name: "Filter" }));
    expect(f.componentInstance.pressed).toBe(true);
    expect(f.componentInstance.active).toBe(true);
    await user().click(screen.getByRole("button", { name: "Remove Filter" }));
    expect(f.componentInstance.removed).toBe(true);
    fireEvent.error(screen.getByRole("img"));
    await settle(f);
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveTextContent(
      "AL",
    );
  });
  it("clamps pagination jumps and resets page after page size changes", async () => {
    const f = await render(PaginationHost);
    expect(
      screen.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "500" },
    });
    await settle(f);
    expect(f.componentInstance.page).toBe(10);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "20" } });
    await settle(f);
    expect(f.componentInstance.pageSize).toBe(20);
    expect(f.componentInstance.page).toBe(1);
  });
  it("formats JSON without changing numeric lexemes or duplicate properties", async () => {
    const f = await render(EditorHost);
    await user().click(screen.getByRole("button", { name: "Format JSON" }));
    expect(f.componentInstance.json).toContain("9007199254740993");
    expect(f.componentInstance.json.match(/"a"/g)).toHaveLength(2);
    expect(f.componentInstance.json).toContain("\n");
  });
  it("adds, edits and removes key/value rows while exposing duplicate keys", async () => {
    const f = await render(EditorHost);
    await user().click(screen.getByRole("button", { name: "Add row" }));
    const input = screen.getByRole("textbox", { name: "Key 2" });
    await user().type(input, "one");
    expect(input).toHaveAttribute("aria-invalid", "true");
    await user().click(screen.getByRole("button", { name: "Remove row 1" }));
    expect(f.componentInstance.rows).toEqual([{ key: "one", value: "" }]);
  });
  it("renders only the visible virtual range and updates on scrolling", async () => {
    const f = await render(VirtualHost);
    expect(screen.getAllByRole("listitem").length).toBeLessThan(10);
    const viewport = f.nativeElement.querySelector(
      "mn-virtual-list",
    ) as HTMLElement;
    viewport.scrollTop = 400;
    fireEvent.scroll(viewport);
    await settle(f);
    expect(screen.getByText("Row 19")).toBeVisible();
    expect(screen.queryByText("Row 0")).toBeNull();
  });
  it("navigates dates with a roving grid focus and selects with a native button", async () => {
    const f = await render(CalendarHost);
    screen.getByRole("gridcell", { name: "2026-10-09" }).focus();
    await user().keyboard("{ArrowRight}");
    await settle(f);
    expect(screen.getByRole("gridcell", { name: "2026-10-10" })).toHaveFocus();
    await user().keyboard("{Enter}");
    expect(f.componentInstance.value).toBe("2026-10-10");
  });
  it("sorts actual table rows and emits row selection", async () => {
    const f = await render(TableHost);
    await user().click(screen.getByRole("button", { name: "Name" }));
    expect(
      screen
        .getAllByRole("cell")
        .map((x) => x.textContent)
        .filter(Boolean),
    ).toEqual(["Ada", "Zoe"]);
    await user().click(screen.getByRole("checkbox", { name: "Select row 2" }));
    expect(f.componentInstance.selection).toEqual(["2"]);
    expect(screen.getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
  });
  it("filters and activates a command using the keyboard", async () => {
    const f = await render(CommandHost);
    const search = screen.getByRole("combobox");
    await user().type(search, "Save");
    expect(screen.queryByRole("option", { name: "Open file" })).toBeNull();
    await user().keyboard("{Enter}");
    expect(f.componentInstance.selected).toBe("save");
    expect(f.componentInstance.open).toBe(false);
  });
  it("opens menus, skips disabled entries and restores focus on escape", async () => {
    const f = await render(MenuHost);
    const trigger = screen.getByRole("button", { name: "Actions" });
    await user().click(trigger);
    await settle(f);
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
    await user().keyboard("{ArrowDown}{Enter}");
    expect(f.componentInstance.selected).toBe("delete");
    await settle(f);
    expect(trigger).toHaveFocus();
  });
  it("connects tooltip descriptions to the focused control", async () => {
    const f = await render(TooltipHost);
    const target = screen.getByRole("button", { name: "Target" });
    target.focus();
    await settle(f);
    expect(target).toHaveAttribute(
      "aria-describedby",
      screen.getByRole("tooltip").id,
    );
    await user().keyboard("{Escape}");
    await settle(f);
    expect(screen.queryByRole("tooltip")).toBeNull();
  });
  it("collapses and dismisses an alert", async () => {
    await render(AlertHost);
    await user().click(screen.getByRole("button", { name: "Collapse" }));
    expect(screen.getByText("Details")).not.toBeVisible();
    await user().click(screen.getByRole("button", { name: "Dismiss alert" }));
    expect(screen.queryByRole("alert")).toBeNull();
  });
  it("expires and clears service notifications", () => {
    vi.useFakeTimers();
    const service = TestBed.inject(MnToastService);
    service.show({ title: "Saved", duration: 20 });
    expect(service.messages()).toHaveLength(1);
    vi.advanceTimersByTime(20);
    expect(service.messages()).toEqual([]);
    service.show({ title: "Persistent", duration: 0 });
    vi.advanceTimersByTime(10000);
    expect(service.messages()).toHaveLength(1);
    service.clear();
    expect(service.messages()).toEqual([]);
    vi.useRealTimers();
  });
});
