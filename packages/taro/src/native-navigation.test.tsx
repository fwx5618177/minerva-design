import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import Taro from "@tarojs/taro";
import * as M from "./index";
afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});
it("TimePicker accepts typed drafts, restores refused controlled values, resolves seconds format and exposes native 12-hour columns", () => {
  const change = vi.fn(),
    opened = vi.fn();
  const { rerender } = render(
    <M.TimePicker
      value={new Date(2025, 0, 1, 13, 15, 30)}
      use12Hours
      format="hh:mm:ss a"
      showSecond={false}
      minuteStep={15}
      onChange={change}
      onOpenChange={opened}
    />,
  );
  const input = screen.getByRole("textbox", { name: "Time" });
  expect(input).toHaveValue("01:15 PM");
  fireEvent.input(input, { target: { value: "02:30 PM" } });
  expect(change.mock.calls[0][0].getHours()).toBe(14);
  fireEvent.blur(input);
  expect(input).toHaveValue("01:15 PM");
  fireEvent.click(input);
  expect(opened).toHaveBeenCalledWith(true);
  expect(
    screen.queryByRole("listbox", { name: "Seconds" }),
  ).not.toBeInTheDocument();
  expect(
    within(screen.getByRole("listbox", { name: "Minutes" })).getAllByRole(
      "option",
    ),
  ).toHaveLength(4);
  fireEvent.click(screen.getByRole("option", { name: "AM" }));
  expect(change.mock.calls.at(-1)?.[0].getHours()).toBe(1);
  expect(input).toHaveValue("01:15 PM");
  rerender(
    <M.TimePicker
      defaultValue={new Date(2025, 0, 1, 9, 0)}
      format="HH:mm"
      minTime={new Date(2025, 0, 1, 8, 30)}
      maxTime={new Date(2025, 0, 1, 10, 0)}
    />,
  );
  expect(
    within(screen.getByRole("listbox", { name: "Hours" })).getByRole("option", {
      name: "07",
    }),
  ).toHaveAttribute("aria-disabled", "true");
});
it("TimePicker inherits form locks and rejects invalid or out-of-range typed drafts", () => {
  const change = vi.fn();
  const { rerender } = render(
    <M.TimePicker
      defaultValue={new Date(2025, 0, 1, 9, 30)}
      format="HH:mm"
      minTime={new Date(2025, 0, 1, 9, 0)}
      onChange={change}
    />,
  );
  const input = screen.getByRole("textbox", { name: "Time" });
  fireEvent.input(input, { target: { value: "08:30" } });
  fireEvent.blur(input);
  expect(change).not.toHaveBeenCalled();
  expect(input).toHaveValue("09:30");
  fireEvent.input(input, { target: { value: "9:45" } });
  fireEvent.blur(input);
  expect(change.mock.calls[0][0].getMinutes()).toBe(45);
  rerender(
    <M.FormControl readOnly>
      <M.TimePicker label="Meeting" onChange={change} />
    </M.FormControl>,
  );
  expect(screen.getByRole("textbox", { name: "Meeting" })).toHaveAttribute(
    "aria-readonly",
    "true",
  );
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
});
it("PageTab implements onSelect and aria-current while leaving its separate action available when label is disabled", () => {
  const select = vi.fn(),
    close = vi.fn();
  render(
    <M.PageTabs activeValue="a" aria-label="Open pages">
      <M.PageTab
        value="a"
        label="Alpha"
        onSelect={select}
        action={<M.Button onClick={close}>Close Alpha</M.Button>}
      />
      <M.PageTab
        value="b"
        label="Beta"
        disabled
        action={<M.Button onClick={close}>Close Beta</M.Button>}
      />
    </M.PageTabs>,
  );
  expect(screen.getByRole("tab", { name: "Alpha" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  fireEvent.click(screen.getByRole("tab", { name: "Alpha" }));
  expect(select).toHaveBeenCalledOnce();
  fireEvent.click(screen.getByRole("button", { name: "Close Beta" }));
  expect(close).toHaveBeenCalledOnce();
});
it("PageTabs measures native overflow, scrolls toward either edge and requests active-item visibility after navigation", async () => {
  vi.spyOn(Taro, "createSelectorQuery").mockImplementation(() => {
    let selector = "";
    const query = {
      select: (s: string) => {
        selector = s;
        return query;
      },
      boundingClientRect: (cb: (rect: unknown) => void) => {
        cb({
          width: selector.endsWith("-content") ? 600 : 200,
          left: 0,
          right: 200,
          top: 0,
          bottom: 40,
          height: 40,
        });
        return query;
      },
      exec: (cb?: () => void) => {
        cb?.();
      },
    };
    return query as unknown as ReturnType<typeof Taro.createSelectorQuery>;
  });
  const scrollIntoView = vi.spyOn(HTMLElement.prototype, "scrollIntoView");
  const { container, rerender } = render(
    <M.PageTabs activeValue="a">
      <M.PageTab value="a" label="Alpha" />
      <M.PageTab value="b" label="Beta" />
    </M.PageTabs>,
  );
  expect(
    screen.getByRole("button", { name: "Scroll pages left" }),
  ).toHaveAttribute("aria-disabled", "true");
  fireEvent.click(screen.getByRole("button", { name: "Scroll pages right" }));
  expect(
    screen.getByRole("button", { name: "Scroll pages left" }),
  ).not.toHaveAttribute("aria-disabled", "true");
  rerender(
    <M.PageTabs activeValue="b">
      <M.PageTab value="a" label="Alpha" />
      <M.PageTab value="b" label="Beta" />
    </M.PageTabs>,
  );
  await act(async () => {});
  expect(scrollIntoView.mock.contexts.at(-1)).toBe(
    container.querySelector('[data-value="b"]'),
  );
});
it("Popover uses native measured collision flipping, anchor width, offsets and controlled outside dismissal", () => {
  vi.spyOn(Taro, "getSystemInfoSync").mockReturnValue({
    windowWidth: 300,
    windowHeight: 200,
  } as ReturnType<typeof Taro.getSystemInfoSync>);
  vi.spyOn(Taro, "createSelectorQuery").mockImplementation(() => {
    let selector = "";
    const query = {
      select: (s: string) => {
        selector = s;
        return query;
      },
      boundingClientRect: (cb: (rect: unknown) => void) => {
        cb(
          selector.endsWith("-panel")
            ? {
                width: 120,
                height: 70,
                left: 0,
                top: 0,
                right: 120,
                bottom: 70,
              }
            : {
                width: 80,
                height: 30,
                left: 210,
                top: 160,
                right: 290,
                bottom: 190,
              },
        );
        return query;
      },
      exec: (cb?: () => void) => cb?.(),
    };
    return query as unknown as ReturnType<typeof Taro.createSelectorQuery>;
  });
  const change = vi.fn();
  const { container } = render(
    <M.Popover open onOpenChange={change}>
      <M.PopoverTrigger>
        <M.Button>Details</M.Button>
      </M.PopoverTrigger>
      <M.PopoverContent
        aria-label="Details panel"
        side="bottom"
        align="end"
        sideOffset={6}
        collisionPadding={8}
        matchAnchorWidth="exact"
        arrow
      >
        Info
      </M.PopoverContent>
    </M.Popover>,
  );
  expect(screen.getByRole("dialog", { name: "Details panel" })).toHaveStyle({
    position: "fixed",
    left: "210px",
    top: "84px",
    width: "80px",
  });
  expect(screen.getByRole("dialog")).toHaveAttribute("data-side", "top");
  expect(container.querySelector(".mn-floating-arrow")).toBeInTheDocument();
  fireEvent.click(container.querySelector(".mn-popover-backdrop")!);
  expect(change).toHaveBeenCalledWith(false);
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});
it("Tooltip consumes placement offsets, animation, zIndex and shaped variants without leaking props", () => {
  const { container } = render(
    <M.Tooltip
      open
      content="Hint"
      placement="bottom-end"
      offset={[3, 10]}
      zIndex={2000}
      animation="scale"
      variant="glass"
      shape="thought"
      arrow
    >
      <M.Button>Tip</M.Button>
    </M.Tooltip>,
  );
  expect(screen.getByRole("tooltip")).toHaveStyle({ zIndex: "2000" });
  expect(screen.getByRole("tooltip")).toHaveClass(
    "mn-tooltip-animation-scale",
    "mn-variant-glass",
    "mn-tooltip-shape-thought",
  );
  expect(container.querySelector("[offset]")).not.toBeInTheDocument();
});
it("VirtualList measures a fixed row when itemHeight is omitted and gates loadMore promises with pixel thresholds", async () => {
  vi.useFakeTimers();
  vi.spyOn(Taro, "createSelectorQuery").mockImplementation(() => {
    const query = {
      select: () => query,
      boundingClientRect: (cb: (rect: unknown) => void) => {
        cb({ height: 30, width: 200 });
        return query;
      },
      exec: () => {},
    };
    return query as unknown as ReturnType<typeof Taro.createSelectorQuery>;
  });
  let finish: () => void = () => {};
  const load = vi.fn(
    () =>
      new Promise<void>((resolve) => {
        finish = resolve;
      }),
  );
  const { container } = render(
    <M.VirtualList
      items={Array.from({ length: 20 }, (_, id) => ({ id }))}
      maxHeight={100}
      itemPadding={4}
      loadMoreThreshold={50}
      onLoadMore={load}
      renderItem={(item) => `Row ${item.id}`}
    />,
  );
  const item = container.querySelector(".mn-virtual-list-item")!;
  expect(item).toHaveStyle({ height: "30px", padding: "4px" });
  const scroll = container.querySelector(".mn-virtual-list")!;
  Object.defineProperties(scroll, {
    scrollHeight: { configurable: true, value: 600 },
    offsetHeight: { configurable: true, value: 100 },
    scrollTop: { configurable: true, writable: true, value: 440 },
  });
  fireEvent.scroll(scroll);
  expect(load).not.toHaveBeenCalled();
  Object.assign(scroll, { scrollTop: 451 });
  fireEvent.scroll(scroll);
  fireEvent.scroll(scroll);
  act(() => vi.advanceTimersByTime(220));
  expect(load).toHaveBeenCalledOnce();
  await act(async () => {
    finish();
  });
  Object.assign(scroll, { scrollTop: 452 });
  fireEvent.scroll(scroll);
  act(() => vi.advanceTimersByTime(220));
  expect(load).toHaveBeenCalledTimes(2);
});
it("Tooltip native trigger callbacks and content class honor a composed child without an extra trigger wrapper", () => {
  vi.useFakeTimers();
  const opened = vi.fn(),
    closed = vi.fn(),
    clicked = vi.fn();
  const { container } = render(
    <M.Tooltip
      content="Hint"
      enterDelay={0}
      leaveDelay={0}
      asChild
      onOpen={opened}
      onClose={closed}
      contentClassName="custom-hint"
    >
      <M.Button onClick={clicked}>Tip</M.Button>
    </M.Tooltip>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Tip" }));
  expect(opened).toHaveBeenCalledOnce();
  expect(clicked).toHaveBeenCalledOnce();
  expect(screen.getByRole("tooltip")).toHaveClass("custom-hint");
  expect(container.querySelector(".mn-tooltip-anchor")).toHaveAttribute(
    "role",
    "button",
  );
  fireEvent.click(screen.getByRole("button", { name: "Tip" }));
  expect(closed).toHaveBeenCalledOnce();
});
it("Popover explicit native anchor and close composition preserve child actions", () => {
  const close = vi.fn();
  render(
    <M.Popover defaultOpen>
      <M.PopoverAnchor asChild>
        <M.Box>Anchor</M.Box>
      </M.PopoverAnchor>
      <M.PopoverContent>
        <M.PopoverClose asChild>
          <M.Button onClick={close}>Done</M.Button>
        </M.PopoverClose>
      </M.PopoverContent>
    </M.Popover>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Done" }));
  expect(close).toHaveBeenCalledOnce();
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
it.each(["Select", "AutoComplete", "Cascader"] as const)(
  "%s measures and flips its native options at the viewport edge and stops measuring after unmount",
  (name) => {
    vi.useFakeTimers();
    vi.spyOn(Taro, "getSystemInfoSync").mockReturnValue({
      windowWidth: 300,
      windowHeight: 200,
    } as ReturnType<typeof Taro.getSystemInfoSync>);
    const measure = vi
      .spyOn(Taro, "createSelectorQuery")
      .mockImplementation(() => {
        let selector = "";
        const query = {
          select: (value: string) => {
            selector = value;
            return query;
          },
          boundingClientRect: (cb: (rect: unknown) => void) => {
            cb(
              selector.endsWith("-panel")
                ? {
                    width: 120,
                    height: 70,
                    left: 0,
                    top: 0,
                    right: 120,
                    bottom: 70,
                  }
                : {
                    width: 80,
                    height: 30,
                    left: 210,
                    top: 160,
                    right: 290,
                    bottom: 190,
                  },
            );
            return query;
          },
          exec: (cb?: () => void) => cb?.(),
        };
        return query as unknown as ReturnType<typeof Taro.createSelectorQuery>;
      });
    const C = M[name];
    const view = render(<C open options={[{ value: "one", label: "One" }]} />);
    const panel = screen.getByRole("listbox");
    expect(panel).toHaveStyle({
      position: "fixed",
      top: "86px",
      left: "172px",
      minWidth: "120px",
    });
    expect(panel).toHaveAttribute("data-side", "top");
    view.unmount();
    const count = measure.mock.calls.length;
    act(() => vi.advanceTimersByTime(400));
    expect(measure).toHaveBeenCalledTimes(count);
  },
);
it.each([
  ["ltr", 210, "left"],
  ["rtl", 170, "left"],
  ["rtl", 8, "right"],
] as const)(
  "Menu submenu %s at x=%s floats toward %s and stops measuring when closed",
  (dir, left, side) => {
    vi.useFakeTimers();
    vi.spyOn(Taro, "getSystemInfoSync").mockReturnValue({
      windowWidth: 320,
      windowHeight: 240,
    } as ReturnType<typeof Taro.getSystemInfoSync>);
    let submenuMeasurements = 0;
    const measure = vi
      .spyOn(Taro, "createSelectorQuery")
      .mockImplementation(() => {
        let selector = "";
        const query = {
          select: (value: string) => {
            selector = value;
            return query;
          },
          boundingClientRect: (cb: (rect: unknown) => void) => {
            if (selector.includes("mn-menu-sub-")) submenuMeasurements++;
            cb(
              selector.endsWith("-panel")
                ? {
                    width: 100,
                    height: 70,
                    left: 0,
                    top: 0,
                    right: 100,
                    bottom: 70,
                  }
                : {
                    width: 90,
                    height: 30,
                    left,
                    top: 70,
                    right: left + 90,
                    bottom: 100,
                  },
            );
            return query;
          },
          exec: (cb?: () => void) => cb?.(),
        };
        return query as unknown as ReturnType<typeof Taro.createSelectorQuery>;
      });
    const selected = vi.fn();
    const view = render(
      <M.Menu
        dir={dir}
        defaultOpen
        items={[
          {
            key: "more",
            label: "More",
            children: [{ key: "leaf", label: "Leaf" }],
          },
        ]}
        onSelect={selected}
      >
        <M.Button>Actions</M.Button>
      </M.Menu>,
    );
    const trigger = screen.getByRole("menuitem", { name: "More" });
    fireEvent.click(trigger);
    const submenu = screen.getByRole("menu", { name: "More" });
    expect(submenu).toHaveAttribute("data-side", side);
    expect(submenu).toHaveStyle({ position: "fixed", top: "65px" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(trigger);
    expect(screen.queryByRole("menu", { name: "More" })).toBeNull();
    const closedMeasurements = submenuMeasurements;
    act(() => vi.advanceTimersByTime(300));
    expect(submenuMeasurements).toBe(closedMeasurements);
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("menuitem", { name: "Leaf" }));
    expect(selected).toHaveBeenCalledWith(
      expect.objectContaining({ key: "leaf" }),
    );
    expect(screen.queryByRole("menu")).toBeNull();
    view.unmount();
    const count = measure.mock.calls.length;
    act(() => vi.advanceTimersByTime(300));
    expect(measure).toHaveBeenCalledTimes(count);
  },
);
