// Horizontal composite widgets follow the reading direction inherited from a
// `dir="rtl"` ancestor (no `dir` prop): ArrowLeft / ArrowRight are swapped,
// and portalled popups keep the direction of their anchor.
import { act, useState, type ReactNode } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Cascader,
  ContextMenu,
  Menu,
  MonthCalendar,
  NavTree,
  PageTab,
  PageTabs,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Rating,
  Select,
  SelectItem,
  Tab,
  TabList,
  Tabs,
  TimePicker,
  Tooltip,
  type MenuEntry,
} from "../index";
import { getDirection, logicalArrowKey } from "../internal/direction";

const Rtl = ({ children }: { children: ReactNode }) => (
  <div dir="rtl">{children}</div>
);

describe("getDirection / logicalArrowKey", () => {
  it("reads the nearest explicit dir, skipping dir=auto, defaulting to ltr", () => {
    const { container } = render(
      <div dir="rtl">
        <div dir="auto">
          <span data-testid="a" />
        </div>
        <div dir="ltr">
          <span data-testid="b" />
        </div>
      </div>,
    );
    expect(getDirection(screen.getByTestId("a"))).toBe("rtl");
    expect(getDirection(screen.getByTestId("b"))).toBe("ltr");
    expect(getDirection(null)).toBe("ltr");
    expect(getDirection(container.ownerDocument.body)).toBe("ltr");
    const a = screen.getByTestId("a");
    expect(logicalArrowKey("ArrowLeft", a)).toBe("ArrowRight");
    expect(logicalArrowKey("ArrowRight", a)).toBe("ArrowLeft");
    expect(logicalArrowKey("ArrowUp", a)).toBe("ArrowUp");
    expect(logicalArrowKey("ArrowLeft", a, "ltr")).toBe("ArrowLeft");
  });

  it("falls back to the computed CSS direction", () => {
    render(<span data-testid="c" style={{ direction: "rtl" }} />);
    expect(getDirection(screen.getByTestId("c"))).toBe("rtl");
  });
});

describe("RTL keyboard: inherited dir", () => {
  it("Tabs: ArrowLeft moves to the next tab, ArrowRight to the previous", async () => {
    const user = userEvent.setup();
    render(
      <Rtl>
        <Tabs defaultValue="a">
          <TabList aria-label="T">
            <Tab value="a">A</Tab>
            <Tab value="b">B</Tab>
            <Tab value="c">C</Tab>
          </TabList>
        </Tabs>
      </Rtl>,
    );
    await user.tab();
    expect(screen.getByRole("tab", { name: "A" })).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "B" })).toHaveFocus();
    await user.keyboard("{ArrowRight}{ArrowRight}");
    expect(screen.getByRole("tab", { name: "C" })).toHaveFocus();
  });

  it("Tabs: an explicit dir='ltr' prop wins over the inherited direction", async () => {
    const user = userEvent.setup();
    render(
      <Rtl>
        <Tabs defaultValue="a" dir="ltr">
          <TabList aria-label="T">
            <Tab value="a">A</Tab>
            <Tab value="b">B</Tab>
          </TabList>
        </Tabs>
      </Rtl>,
    );
    await user.tab();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "B" })).toHaveFocus();
  });

  it("Rating: ArrowLeft increases, ArrowRight decreases", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Rtl>
        <Rating value={3} max={5} onChange={onChange} />
      </Rtl>,
    );
    screen.getByRole("slider").focus();
    await user.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenLastCalledWith(3.5);
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith(2.5);
    // Up / Down are unaffected
    await user.keyboard("{ArrowUp}");
    expect(onChange).toHaveBeenLastCalledWith(3.5);
  });

  it("Pagination: ArrowLeft goes to the next page, ArrowRight to the previous", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Rtl>
        <Pagination total={100} current={5} onChange={onChange} />
      </Rtl>,
    );
    screen.getByRole("button", { name: /^5|page 5/i, current: "page" }).focus();
    await user.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenLastCalledWith(6, 10);
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith(4, 10);
  });

  it("MonthCalendar: ArrowLeft is the next day, ArrowRight the previous", () => {
    const { container } = render(
      <Rtl>
        <MonthCalendar
          month={new Date(2024, 1, 1)}
          onMonthChange={vi.fn()}
          onChange={vi.fn()}
        />
      </Rtl>,
    );
    const day = (key: string) =>
      container.querySelector<HTMLElement>(`[data-date="${key}"]`)!;
    act(() => day("2024-02-14").focus());
    fireEvent.keyDown(day("2024-02-14"), { key: "ArrowLeft" });
    expect(day("2024-02-15")).toHaveFocus();
    fireEvent.keyDown(day("2024-02-15"), { key: "ArrowRight" });
    fireEvent.keyDown(day("2024-02-14"), { key: "ArrowRight" });
    expect(day("2024-02-13")).toHaveFocus();
  });

  it("NavTree: ArrowLeft expands / enters a branch, ArrowRight collapses / returns", async () => {
    const user = userEvent.setup();
    const Controlled = () => {
      const [ids, setIds] = useState<string[]>([]);
      return (
        <Rtl>
          <NavTree
            sections={[
              {
                id: "s",
                title: "S",
                items: [
                  {
                    id: "ops",
                    label: "Ops",
                    children: [{ id: "x", label: "Stats", href: "/x" }],
                  },
                ],
              },
            ]}
            expandedIds={ids}
            onExpandedChange={setIds}
          />
        </Rtl>
      );
    };
    render(<Controlled />);
    const branch = screen.getByRole("button", { name: "Ops" });
    act(() => branch.focus());
    await user.keyboard("{ArrowRight}");
    expect(branch).toHaveAttribute("aria-expanded", "false");
    await user.keyboard("{ArrowLeft}");
    expect(branch).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("link", { name: "Stats" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(branch).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(branch).toHaveAttribute("aria-expanded", "false");
  });

  it("Cascader: the portalled panel is rtl; ArrowLeft expands, ArrowRight goes back", async () => {
    const user = userEvent.setup();
    render(
      <Rtl>
        <Cascader
          label="Area"
          name="area"
          options={[
            {
              value: "zj",
              label: "Zhejiang",
              children: [{ value: "hz", label: "Hangzhou" }],
            },
          ]}
        />
      </Rtl>,
    );
    screen.getByRole("combobox").focus();
    await user.keyboard("{Enter}");
    const first = screen.getByRole("option", { name: "Zhejiang" });
    expect(first).toHaveFocus();
    await waitFor(() =>
      expect(first.closest("[dir]")).toHaveAttribute("dir", "rtl"),
    );
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("option", { name: "Hangzhou" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("option", { name: "Zhejiang" })).toHaveFocus();
  });

  it("TimePicker: ArrowLeft moves to the next column", async () => {
    const user = userEvent.setup();
    render(
      <Rtl>
        <TimePicker defaultValue={new Date(2024, 0, 1, 10, 30, 0)} />
      </Rtl>,
    );
    screen.getByRole("textbox").focus();
    await user.keyboard("{ArrowDown}");
    const hours = screen.getByRole("listbox", { name: "Hours" });
    const ten = hours.querySelector<HTMLElement>('[aria-selected="true"]')!;
    act(() => ten.focus());
    await waitFor(() =>
      expect(hours.closest("[dir]")).toHaveAttribute("dir", "rtl"),
    );
    await user.keyboard("{ArrowLeft}");
    const minutes = screen.getByRole("listbox", { name: "Minutes" });
    expect(minutes.contains(document.activeElement)).toBe(true);
    await user.keyboard("{ArrowRight}");
    expect(hours.contains(document.activeElement)).toBe(true);
  });

  it("Menu: inherits rtl from the trigger (ArrowLeft opens a submenu, ArrowRight closes it)", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const items: MenuEntry[] = [
      { key: "new", label: "New" },
      {
        key: "share",
        label: "Share",
        children: [{ key: "mail", label: "Mail" }],
      },
    ];
    render(
      <Rtl>
        <Menu items={items}>
          <button type="button">Open</button>
        </Menu>
      </Rtl>,
    );
    act(() => screen.getByRole("button", { name: "Open" }).focus());
    await user.keyboard("{ArrowDown}");
    const menu = await screen.findByRole("menu");
    await waitFor(() => expect(menu).toHaveAttribute("dir", "rtl"));
    await user.keyboard("{ArrowDown}{ArrowRight}");
    expect(screen.getAllByRole("menu")).toHaveLength(1);
    await user.keyboard("{ArrowLeft}");
    await waitFor(() =>
      expect(screen.getByRole("menuitem", { name: "Mail" })).toHaveFocus(),
    );
    await user.keyboard("{ArrowRight}");
    expect(screen.getAllByRole("menu")).toHaveLength(1);
    expect(screen.getByRole("menuitem", { name: "Share" })).toHaveFocus();
  });

  it("ContextMenu: inherits rtl from its area", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <Rtl>
        <ContextMenu items={[{ key: "a", label: "Alpha" }]}>
          <button type="button" data-testid="area">
            Area
          </button>
        </ContextMenu>
      </Rtl>,
    );
    act(() => screen.getByTestId("area").focus());
    await user.keyboard("{Shift>}{F10}{/Shift}");
    expect(await screen.findByRole("menu")).toHaveAttribute("dir", "rtl");
  });

  it("Select, Popover and Tooltip popups keep the anchor's direction", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <Rtl>
        <Select aria-label="S">
          <SelectItem value="1">One</SelectItem>
        </Select>
        <Popover>
          <PopoverTrigger>Pop</PopoverTrigger>
          <PopoverContent aria-label="P">Body</PopoverContent>
        </Popover>
        <Tooltip content="Tip" defaultOpen>
          <button type="button">T</button>
        </Tooltip>
      </Rtl>,
    );
    await waitFor(() =>
      expect(screen.getByRole("tooltip")).toHaveAttribute("dir", "rtl"),
    );
    await user.click(screen.getByRole("button", { name: "Pop" }));
    await waitFor(() =>
      expect(screen.getByRole("dialog")).toHaveAttribute("dir", "rtl"),
    );
    await user.keyboard("{Escape}");
    await user.click(screen.getByRole("combobox"));
    const listbox = await screen.findByRole("listbox");
    await waitFor(() =>
      expect(listbox.closest("[dir]")).toHaveAttribute("dir", "rtl"),
    );
  });

  it("popups in an ltr document get no dir attribute", async () => {
    render(
      <Tooltip content="Tip" defaultOpen>
        <button type="button">T</button>
      </Tooltip>,
    );
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).not.toHaveAttribute("dir");
  });

  it("PageTabs: overflow buttons use RTL scroll offsets", () => {
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(200);
    vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(600);
    const { container } = render(
      <Rtl>
        <PageTabs aria-label="Pages" activeValue="a">
          <PageTab value="a" label="A" />
        </PageTabs>
      </Rtl>,
    );
    const left = screen.getByRole("button", { name: "Scroll pages left" });
    const right = screen.getByRole("button", { name: "Scroll pages right" });
    // At the start of an RTL strip (scrollLeft 0) only "left" can scroll.
    expect(left).toBeEnabled();
    expect(right).toBeDisabled();
    // The right button comes first in the DOM (it sits on the right in RTL).
    const buttons = Array.from(container.querySelectorAll("nav > button"));
    expect(buttons.indexOf(right)).toBeLessThan(buttons.indexOf(left));
    vi.restoreAllMocks();
  });
});
