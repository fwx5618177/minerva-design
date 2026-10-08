// Consumer CSS through the public item-state hooks (React): an app styles
// the highlighted menu item, the selected / highlighted option of a select,
// the current page, the sorted column header and success toasts with
// [data-minerva][data-part] + state attribute selectors only (no class
// names), then drives the components with the keyboard and the pointer and
// checks the computed styles follow the item states (happy-dom applies
// attribute selectors in getComputedStyle).
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import {
  Menu,
  MonthCalendar,
  Pagination,
  Select,
  SelectItem,
  Table,
  ToastProvider,
  toast,
} from "@minerva/lib-core";

const HIGHLIGHT = "rgb(255, 0, 0)";
const SELECTED = "rgb(0, 128, 0)";
const CURRENT = "rgb(0, 0, 255)";

/** The consumer stylesheet: public hooks only */
const consumerCss = `
[data-minerva="menu"][data-part="item"][data-highlighted] { color: ${HIGHLIGHT}; }
[data-minerva="menu"][data-part="item"][data-state="checked"] { font-weight: 700; }
[data-minerva="menu"][data-part="item"][data-disabled] { opacity: 0.5; }
[data-minerva="option"][data-highlighted] { color: ${HIGHLIGHT}; }
[data-minerva="option"][data-selected] { background-color: ${SELECTED}; }
[data-minerva="pagination"][data-part="item"][data-current] { color: ${CURRENT}; }
[data-minerva="data-table"][data-part="header-cell"][data-sort="ascending"] { color: ${SELECTED}; }
[data-minerva="data-table"][data-part="header-cell"][data-sort="descending"] { color: ${CURRENT}; }
[data-minerva="data-table"][data-part="row"][data-selected] { background-color: ${SELECTED}; }
[data-minerva="month-calendar"][data-part="day"][data-selected] { color: ${SELECTED}; }
[data-minerva="toast-region"][data-part="toast"][data-color="success"] { border-left-color: ${SELECTED}; }
`;

function addConsumerCss() {
  const style = document.createElement("style");
  style.textContent = consumerCss;
  document.head.append(style);
  return style;
}

let sheet: HTMLStyleElement | undefined;
afterEach(() => {
  sheet?.remove();
  sheet = undefined;
});

const color = (el: Element) => getComputedStyle(el).color;
const background = (el: Element) => getComputedStyle(el).backgroundColor;

describe("item state hooks: consumer CSS (React)", () => {
  it("restyles the menu item highlighted with the arrow keys", async () => {
    sheet = addConsumerCss();
    const user = userEvent.setup();
    render(
      <Menu
        items={[
          { key: "edit", label: "Edit" },
          { key: "copy", label: "Duplicate" },
          {
            type: "checkbox",
            key: "pin",
            label: "Pinned",
            defaultChecked: true,
          },
          { key: "delete", label: "Delete", disabled: true },
        ]}
      >
        <button type="button">Actions</button>
      </Menu>,
    );
    screen.getByRole("button", { name: "Actions" }).focus();
    await user.keyboard("{ArrowDown}");
    const edit = await screen.findByRole("menuitem", { name: "Edit" });
    const copy = screen.getByRole("menuitem", { name: "Duplicate" });
    await waitFor(() => expect(edit).toHaveFocus());
    expect(edit).toHaveAttribute("data-highlighted", "");
    expect(color(edit)).toBe(HIGHLIGHT);
    expect(color(copy)).not.toBe(HIGHLIGHT);

    await user.keyboard("{ArrowDown}");
    expect(copy).toHaveFocus();
    expect(color(copy)).toBe(HIGHLIGHT);
    expect(edit).not.toHaveAttribute("data-highlighted");
    expect(color(edit)).not.toBe(HIGHLIGHT);

    const pinned = screen.getByRole("menuitemcheckbox", { name: "Pinned" });
    expect(pinned).toHaveAttribute("data-state", "checked");
    expect(getComputedStyle(pinned).fontWeight).toBe("700");
    // Space toggles the checkbox item: the hook follows aria-checked
    await user.keyboard("{ArrowDown} ");
    expect(pinned).toHaveAttribute("aria-checked", "false");
    expect(pinned).toHaveAttribute("data-state", "unchecked");
    expect(getComputedStyle(pinned).fontWeight).not.toBe("700");
    expect(
      getComputedStyle(screen.getByRole("menuitem", { name: "Delete" }))
        .opacity,
    ).toBe("0.5");
  });

  it("restyles the highlighted and the selected option of a select", async () => {
    sheet = addConsumerCss();
    const user = userEvent.setup();
    render(
      <Select aria-label="Language" defaultValue="en">
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="fr">French</SelectItem>
        <SelectItem value="ja">Japanese</SelectItem>
      </Select>,
    );
    const trigger = screen.getByRole("combobox", { name: "Language" });
    trigger.focus();
    await user.keyboard("{Enter}");
    const english = await screen.findByRole("option", { name: "English" });
    const french = screen.getByRole("option", { name: "French" });
    expect(english).toHaveAttribute("data-selected", "");
    expect(background(english)).toBe(SELECTED);
    await waitFor(() => expect(english).toHaveAttribute("data-highlighted"));
    expect(color(english)).toBe(HIGHLIGHT);

    await user.keyboard("{ArrowDown}");
    expect(french).toHaveAttribute("data-highlighted", "");
    expect(color(french)).toBe(HIGHLIGHT);
    expect(color(english)).not.toBe(HIGHLIGHT);

    await user.keyboard("{Enter}");
    await user.keyboard("{Enter}");
    const reopened = await screen.findByRole("option", { name: "French" });
    expect(reopened).toHaveAttribute("data-selected", "");
    expect(background(reopened)).toBe(SELECTED);
    expect(
      background(screen.getByRole("option", { name: "English" })),
    ).not.toBe(SELECTED);
  });

  it("restyles the current page as it moves", async () => {
    sheet = addConsumerCss();
    const user = userEvent.setup();
    render(<Pagination defaultCurrent={1} total={50} />);
    const current = () =>
      document.querySelector<HTMLElement>(
        '[data-minerva="pagination"][data-part="item"][aria-current="page"]',
      )!;
    expect(current()).toHaveAttribute("data-current", "");
    expect(current().textContent).toBe("1");
    expect(color(current())).toBe(CURRENT);

    await user.click(screen.getByRole("button", { name: /\b3\b/ }));
    expect(current().textContent).toBe("3");
    expect(color(current())).toBe(CURRENT);
    const others = document.querySelectorAll(
      '[data-minerva="pagination"][data-part="item"]:not([data-current])',
    );
    expect(others.length).toBeGreaterThan(0);
    for (const item of Array.from(others)) {
      expect(color(item)).not.toBe(CURRENT);
    }
  });

  it("restyles the sorted column header and the selected rows", async () => {
    sheet = addConsumerCss();
    const user = userEvent.setup();
    render(
      <Table
        aria-label="Services"
        rowKey={(row) => row.id}
        data={[
          { id: 1, name: "auth-api", latency: 42 },
          { id: 2, name: "billing", latency: 118 },
        ]}
        columns={[
          { key: "name", header: "Service", sortable: true },
          { key: "latency", header: "Latency", sortable: true },
        ]}
        rowSelection={{ defaultSelectedRowKeys: [2] }}
      />,
    );
    const header = (name: string) =>
      screen.getByRole("columnheader", { name: new RegExp(name) });
    expect(header("Service")).toHaveAttribute("data-sort", "none");

    await user.click(screen.getByRole("button", { name: /Service/ }));
    expect(header("Service")).toHaveAttribute("data-sort", "ascending");
    expect(header("Service")).toHaveAttribute("aria-sort", "ascending");
    expect(color(header("Service"))).toBe(SELECTED);
    expect(color(header("Latency"))).not.toBe(SELECTED);

    await user.click(screen.getByRole("button", { name: /Service/ }));
    expect(header("Service")).toHaveAttribute("data-sort", "descending");
    expect(color(header("Service"))).toBe(CURRENT);

    const selected = document.querySelectorAll(
      '[data-minerva="data-table"][data-part="row"][data-selected]',
    );
    expect(selected).toHaveLength(1);
    expect(background(selected[0])).toBe(SELECTED);
    expect(selected[0]).toHaveAttribute("aria-selected", "true");
  });

  it("selects a calendar day with the arrow keys and Enter", async () => {
    sheet = addConsumerCss();
    const user = userEvent.setup();
    render(
      <MonthCalendar
        aria-label="Agenda"
        defaultMonth={new Date(2026, 9, 1)}
        defaultValue="2026-10-08"
      />,
    );
    const selected = () =>
      document.querySelector<HTMLElement>(
        '[data-minerva="month-calendar"][data-part="day"][data-selected]',
      )!;
    const first = selected();
    expect(color(first)).toBe(SELECTED);
    act(() => first.focus());
    // arrows move the focus, Enter selects the focused day
    await user.keyboard("{ArrowRight}");
    expect(selected()).toBe(first);
    await user.keyboard("{Enter}");
    await waitFor(() => expect(selected()).not.toBe(first));
    expect(selected()).toHaveFocus();
    expect(color(selected())).toBe(SELECTED);
    expect(color(first)).not.toBe(SELECTED);
  });

  it("restyles success toasts wherever they are portalled", async () => {
    sheet = addConsumerCss();
    render(<ToastProvider />);
    act(() => {
      toast.success("Saved");
      toast.info("Heads up");
    });
    const success = await waitFor(() => {
      const el = document.querySelector(
        '[data-minerva="toast-region"][data-part="toast"][data-color="success"]',
      );
      expect(el).not.toBeNull();
      return el!;
    });
    expect(success).toHaveAttribute("data-state", "open");
    expect(success.textContent).toContain("Saved");
    expect(getComputedStyle(success).borderLeftColor).toBe(SELECTED);
    const info = document.querySelector(
      '[data-minerva="toast-region"][data-part="toast"][data-color="info"]',
    )!;
    expect(getComputedStyle(info).borderLeftColor).not.toBe(SELECTED);
    act(() => toast.dismiss());
  });
});
