import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Taro from "@tarojs/taro";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import * as M from "./index";
let style: HTMLStyleElement;
beforeEach(() => {
  style = document.createElement("style");
  const root = resolve(
    dirname(fileURLToPath(import.meta.url)),
    "../../../tools/styles",
  );
  style.textContent =
    readFileSync(resolve(root, "mini-controls.css"), "utf8") +
    readFileSync(resolve(root, "taro-components.css"), "utf8");
  document.head.append(style);
});
afterEach(() => {
  style.remove();
  vi.restoreAllMocks();
});
it("Avatar uses React preset geometry, semantic fallback and retries a changed image source", () => {
  const { container, rerender } = render(
    <M.Avatar name="张 三" size="medium" shape="square" src="bad.png" />,
  );
  fireEvent.error(container.querySelector("img")!);
  expect(screen.getByRole("img", { name: "张 三" })).toHaveTextContent("张");
  expect(container.firstElementChild).toHaveStyle({
    width: "48px",
    height: "48px",
    borderRadius: "0px",
  });
  rerender(<M.Avatar name="张 三" src="good.png" size="xlarge" />);
  expect(container.querySelector("img")).toHaveAttribute("src", "good.png");
  expect(container.firstElementChild).toHaveStyle({ width: "80px" });
});
it("AvatarGroup adds count to hidden child count and leaves all avatars visible when max is omitted", () => {
  const { rerender } = render(
    <M.AvatarGroup max={1} count={4}>
      <M.Avatar name="Alpha" />
      <M.Avatar name="Beta" />
    </M.AvatarGroup>,
  );
  expect(
    screen.getByRole("group", { name: "Avatar group with 5 more" }),
  ).toHaveTextContent("+5");
  rerender(
    <M.AvatarGroup>
      {Array.from({ length: 6 }, (_, i) => (
        <M.Avatar key={i} name={`Person ${i}`} />
      ))}
    </M.AvatarGroup>,
  );
  expect(screen.getAllByRole("img")).toHaveLength(6);
});
it("Badge supports standalone text and four corner geometry with customized borders", () => {
  const { container, rerender } = render(
    <M.Badge borderRadius="3px" borderWidth="2px" variant="outline">
      4
    </M.Badge>,
  );
  expect(screen.getByRole("status")).toHaveTextContent("4");
  expect(screen.getAllByText("4")).toHaveLength(1);
  expect(getComputedStyle(screen.getByRole("status")).position).not.toBe(
    "absolute",
  );
  rerender(
    <M.Badge
      content={4}
      position="bottom-left"
      borderRadius="3px"
      borderWidth="2px"
    >
      <M.Button>Inbox</M.Button>
    </M.Badge>,
  );
  const badge = screen.getByRole("status");
  expect(getComputedStyle(badge).position).toBe("absolute");
  expect(badge).toHaveStyle({
    bottom: "0px",
    left: "0px",
    borderRadius: "3px",
    borderWidth: "2px",
  });
  expect(container.querySelector(".mn-badge-wrapper")).toContainElement(
    screen.getByRole("button", { name: "Inbox" }),
  );
});
it("Stack attached joins direct controls with shared borders and only outer radii", () => {
  const { container } = render(
    <M.HStack attached aria-label="Filters">
      <M.Button>A</M.Button>
      <M.Button>B</M.Button>
      <M.Button>C</M.Button>
    </M.HStack>,
  );
  expect(screen.getByRole("group", { name: "Filters" })).toHaveStyle({
    gap: "0",
  });
  const buttons = screen.getAllByRole("button");
  expect(getComputedStyle(buttons[1]).borderTopLeftRadius).toBe("0px");
  expect(getComputedStyle(buttons[1]).borderTopRightRadius).toBe("0px");
  expect(getComputedStyle(buttons[1]).marginLeft).toBe("-1px");
  expect(container.querySelectorAll(".mn-stack-item")).toHaveLength(0);
});
it("Tabs computes a first enabled entry point without silently selecting a controlled missing value", () => {
  const change = vi.fn();
  const { rerender } = render(
    <M.Tabs value="missing" onChange={change}>
      <M.TabList>
        <M.Tab disabled value="a">
          A
        </M.Tab>
        <M.Tab value="b">B</M.Tab>
        <M.Tab value="c">C</M.Tab>
      </M.TabList>
      <M.TabPanel value="b">Panel B</M.TabPanel>
    </M.Tabs>,
  );
  expect(screen.getByRole("tab", { name: "B" })).toHaveAttribute(
    "tabindex",
    "0",
  );
  expect(screen.getByRole("tab", { name: "B" })).toHaveAttribute(
    "aria-selected",
    "false",
  );
  fireEvent.click(screen.getByRole("tab", { name: "B" }));
  expect(change).toHaveBeenCalledWith("b");
  expect(screen.queryByRole("tabpanel")).not.toBeInTheDocument();
  rerender(
    <M.Tabs value="missing">
      <M.TabList>
        <M.Tab disabled value="b">
          B
        </M.Tab>
        <M.Tab value="c">C</M.Tab>
      </M.TabList>
    </M.Tabs>,
  );
  expect(screen.getByRole("tab", { name: "C" })).toHaveAttribute(
    "tabindex",
    "0",
  );
});
it("AppShell compact and floating preserve one navigation subtree and reject controlled mode changes", () => {
  vi.spyOn(Taro, "getSystemInfoSync").mockReturnValue({
    windowWidth: 1200,
  } as ReturnType<typeof Taro.getSystemInfoSync>);
  const change = vi.fn();
  const nav = vi.fn((state: M.AppShellNavigationState) => (
    <M.Box>{state.collapsed ? "Rail" : "Expanded navigation"}</M.Box>
  ));
  const { container, rerender } = render(
    <M.AppShell
      brand="Acme"
      navigation={nav}
      sidebarMode="compact"
      onSidebarModeChange={change}
    >
      Main
    </M.AppShell>,
  );
  expect(screen.getByText("Rail")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Expand sidebar" }));
  expect(change).toHaveBeenCalledWith("expanded");
  expect(screen.getByText("Rail")).toBeInTheDocument();
  rerender(
    <M.AppShell brand="Acme" navigation={nav} defaultSidebarMode="floating">
      Main
    </M.AppShell>,
  );
  fireEvent.click(
    screen.getByRole("button", { name: "Enable floating sidebar" }),
  );
  expect(container.querySelector(".mn-app-sidebar")).toHaveClass(
    "mn-app-floating",
  );
  fireEvent.click(screen.getByRole("button", { name: "Expand sidebar" }));
  expect(screen.getByText("Expanded navigation")).toBeInTheDocument();
  expect(
    getComputedStyle(container.querySelector(".mn-app-sidebar")!).position,
  ).toBe("absolute");
  expect(screen.getAllByText("Expanded navigation")).toHaveLength(1);
});
it("AppShell mobile navigation closes after committed navigationKey changes", () => {
  vi.spyOn(Taro, "getSystemInfoSync").mockReturnValue({
    windowWidth: 375,
  } as ReturnType<typeof Taro.getSystemInfoSync>);
  const nav = (state: M.AppShellNavigationState) => (
    <M.Button onClick={state.closeNavigation}>Go profile</M.Button>
  );
  const { rerender } = render(
    <M.AppShell brand="Acme" navigation={nav} navigationKey="home">
      Main
    </M.AppShell>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  rerender(
    <M.AppShell brand="Acme" navigation={nav} navigationKey="profile">
      Main
    </M.AppShell>,
  );
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
it("Alert uses semantic roles, elevation, explicit animation and canonical expand callback", () => {
  const expand = vi.fn();
  const { container } = render(
    <M.Alert
      title="Notice"
      color="success"
      variant="solid"
      size="large"
      elevation
      rounded={false}
      animationName="zoom"
      collapsible
      onExpand={expand}
    >
      Details
    </M.Alert>,
  );
  const alert = screen.getByRole("status");
  expect(alert.getAttribute("style")).toContain(
    "border-radius: var(--radius-sm)",
  );
  expect(getComputedStyle(alert).boxShadow).not.toBe("none");
  expect(getComputedStyle(alert).animation).toContain("mn-alert-zoom");
  fireEvent.click(screen.getByRole("button", { name: "Collapse" }));
  expect(expand).toHaveBeenCalledWith(false);
  expect(screen.queryByText("Details")).not.toBeInTheDocument();
  expect(container.querySelector(".mn-size-large")).toBe(alert);
});
it("Tag renders size/shape/elevation and ripple, with loading replacing avatar/icon and hiding close", () => {
  vi.useFakeTimers();
  try {
    const click = vi.fn();
    const { container, rerender, unmount } = render(
      <M.Tag
        clickable
        onClick={click}
        closable
        size="large"
        shape="square"
        elevation
        icon="Icon"
      >
        Filter
      </M.Tag>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Filter" }));
    expect(click).toHaveBeenCalledTimes(1);
    expect(container.querySelector(".mn-tag-ripple")).toBeInTheDocument();
    expect(container.querySelector('[data-minerva="tag"]')).toHaveStyle({
      borderRadius: "0px",
    });
    act(() => vi.advanceTimersByTime(650));
    expect(container.querySelector(".mn-tag-ripple")).not.toBeInTheDocument();
    rerender(
      <M.Tag clickable loading closable icon="Icon">
        Filter
      </M.Tag>,
    );
    expect(screen.queryByText("Icon")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Remove Filter" }),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Filter" }));
    expect(click).toHaveBeenCalledTimes(1);
    expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument();
    unmount();
    act(() => vi.runAllTimers());
  } finally {
    vi.useRealTimers();
  }
});
it("remaining display, calendar and command defaults follow scoped locale and explicit overrides win", () => {
  const { rerender } = render(
    <M.ConfigProvider locale={{ language: "zh" }}>
      <M.MonthCalendar defaultMonth={new Date(2025, 0, 1)} value="2025-01-02" />
      <M.PageTabs>
        <M.PageTab value="home" label="首页" closable />
      </M.PageTabs>
      <M.Alert title="信息" closable collapsible>
        描述
      </M.Alert>
      <M.Tag closable>过滤</M.Tag>
      <M.LoadingState />
      <M.CodeBlock code="hello" />
      <M.CommandDialog open items={[]} />
    </M.ConfigProvider>,
  );
  expect(screen.getByRole("button", { name: "上个月" })).toBeInTheDocument();
  expect(screen.getByText("暂无日程")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "关闭 首页" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "移除 过滤" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "复制代码" })).toBeInTheDocument();
  expect(screen.getByRole("dialog", { name: "命令面板" })).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText("搜索命令、路径或关键字"),
  ).toBeInTheDocument();
  rerender(
    <M.ConfigProvider locale={{ language: "zh" }}>
      <M.MonthCalendar previousMonthLabel="Back" />
      <M.CodeBlock code="hello" />
    </M.ConfigProvider>,
  );
  expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
});
it("NumberInput defaults to no steppers, validates native drafts and uses min fallback when empty is forbidden", () => {
  const change = vi.fn();
  const { rerender } = render(
    <M.NumberInput
      min={2}
      max={5}
      allowEmpty={false}
      defaultValue={4}
      aboveMaxMessage="Too high"
      onChange={change}
    />,
  );
  expect(
    screen.queryByRole("button", { name: "Increase" }),
  ).not.toBeInTheDocument();
  const input = screen.getByRole("spinbutton");
  fireEvent.input(input, { target: { value: "9" } });
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByRole("alert")).toHaveTextContent("Too high");
  fireEvent.blur(input);
  expect(change).toHaveBeenLastCalledWith(5);
  fireEvent.input(input, { target: { value: "" } });
  fireEvent.blur(input);
  expect(change).toHaveBeenLastCalledWith(2);
  rerender(<M.NumberInput defaultValue={2} showStepper />);
  expect(screen.getByRole("button", { name: "Increase" })).toBeInTheDocument();
});
it("TagInput splits literal separator pastes, retains incomplete tail, deduplicates suggestions and clears controlled tags", () => {
  const change = vi.fn();
  const { container } = render(
    <M.TagInput
      value={["alpha"]}
      options={["alpha", "beta", "beta"]}
      separators={["::", "Enter"]}
      onChange={change}
    />,
  );
  const input = container.querySelector("input")!;
  fireEvent.input(input, { target: { value: "beta::gamma::tail" } });
  expect(change).toHaveBeenLastCalledWith(["alpha", "beta", "gamma"]);
  expect(input).toHaveValue("tail");
  fireEvent.input(input, { target: { value: "be" } });
  expect(screen.getAllByRole("option", { name: "beta" })).toHaveLength(1);
  fireEvent.click(screen.getByRole("button", { name: "Clear tags" }));
  expect(change).toHaveBeenLastCalledWith([]);
  expect(screen.getByText("alpha")).toBeInTheDocument();
});
it("Switch honors native thumb styling and controlled refusal while blocking read-only", () => {
  const change = vi.fn();
  const { container, rerender } = render(
    <M.Switch
      checked={false}
      label="Alerts"
      thumbStyle={{ backgroundColor: "rgb(1, 2, 3)" }}
      onChange={change}
    />,
  );
  expect(container.querySelector(".mn-switch-thumb")).toHaveStyle({
    backgroundColor: "rgb(1, 2, 3)",
  });
  fireEvent.click(screen.getByRole("switch", { name: "Alerts" }));
  expect(change).toHaveBeenCalledWith(true, expect.any(Object));
  expect(screen.getByRole("switch", { name: "Alerts" })).toHaveAttribute(
    "aria-checked",
    "false",
  );
  rerender(
    <M.Switch
      checked={false}
      readOnly
      label="Alerts"
      thumbStyle={{ backgroundColor: "red" }}
      onChange={change}
    />,
  );
  fireEvent.click(screen.getByRole("switch", { name: "Alerts" }));
  expect(change).toHaveBeenCalledTimes(1);
});
it("IconButton defaultPressed is a toggle and native tooltip configuration is rendered", () => {
  vi.useFakeTimers();
  try {
    render(
      <M.IconButton
        icon="★"
        label="Favorite"
        defaultPressed
        tooltip={{ content: "Save favorite" }}
      />,
    );
    const button = screen.getByRole("button", { name: "Favorite" });
    expect(button).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "false");
    act(() => vi.advanceTimersByTime(200));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Save favorite");
  } finally {
    vi.useRealTimers();
  }
});
it("Divider applies length, axis spacing and flex-item geometry; progress variants have distinct native shapes", () => {
  const { container, rerender } = render(
    <>
      <M.Divider orientation="vertical" length={60} spacing={12} flexItem />
      <M.ProgressIndicator variant="bar" full width="20px" />
      <M.ProgressIndicator variant="wave" label="Loading results" />
    </>,
  );
  const divider = screen.getByRole("separator");
  expect(divider).toHaveStyle({
    height: "60px",
    marginLeft: "12px",
    marginRight: "12px",
    alignSelf: "stretch",
  });
  expect(screen.getAllByRole("progressbar")[0]).toHaveStyle({ width: "100%" });
  expect(container.querySelectorAll(".mn-progress-wave-bar")).toHaveLength(5);
  rerender(
    <M.Divider length={200} textAlign="left">
      Section
    </M.Divider>,
  );
  expect(screen.getByRole("separator")).toHaveStyle({ width: "200px" });
  expect(
    getComputedStyle(container.querySelector(".mn-divider-line")!).flexGrow,
  ).toBe("0");
});
it("native switch feedback ripple honors its flag and pending feedback is cleaned on unmount", () => {
  vi.useFakeTimers();
  try {
    const { container, rerender, unmount } = render(
      <M.Switch label="Alerts" />,
    );
    fireEvent.click(screen.getByRole("switch", { name: "Alerts" }));
    expect(container.querySelector(".mn-switch-ripple")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(650));
    expect(
      container.querySelector(".mn-switch-ripple"),
    ).not.toBeInTheDocument();
    rerender(<M.Switch label="Alerts" ripple={false} />);
    fireEvent.click(screen.getByRole("switch", { name: "Alerts" }));
    expect(
      container.querySelector(".mn-switch-ripple"),
    ).not.toBeInTheDocument();
    unmount();
    act(() => vi.runAllTimers());
  } finally {
    vi.useRealTimers();
  }
});
it("Cascader keeps sibling columns visible and can change an earlier branch without accepting a selected leaf", () => {
  const change = vi.fn();
  render(
    <M.Cascader
      value={[]}
      onChange={change}
      options={[
        {
          value: "a",
          label: "Alpha",
          children: [{ value: "a1", label: "One" }],
        },
        {
          value: "b",
          label: "Beta",
          children: [{ value: "b1", label: "Two" }],
        },
      ]}
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Please select" }));
  fireEvent.click(screen.getByRole("option", { name: "Alpha" }));
  expect(screen.getByRole("option", { name: "Beta" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "One" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("option", { name: "Beta" }));
  expect(screen.queryByRole("option", { name: "One" })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("option", { name: "Two" }));
  expect(change.mock.calls[0][0]).toEqual(["b", "b1"]);
  expect(
    screen.getByRole("button", { name: "Please select" }),
  ).toBeInTheDocument();
});
it("Skeleton supports false/wave animation, decorative circles, avatar geometry and paragraph shapes", () => {
  const { container, rerender } = render(
    <M.Skeleton decorative variant="circular" size={36} animation="false" />,
  );
  expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  expect(container.firstElementChild).toHaveStyle({
    width: "36px",
    height: "36px",
    borderRadius: "50%",
  });
  expect(
    getComputedStyle(container.firstElementChild!).animation,
  ).not.toContain("pulse");
  rerender(
    <M.Skeleton
      paragraph
      avatar
      avatarSize={52}
      avatarShape="square"
      animation="wave"
    />,
  );
  expect(screen.getByRole("status", { name: "Loading" })).toHaveAttribute(
    "aria-busy",
    "true",
  );
  expect(container.querySelector(".mn-skeleton-avatar")).toHaveStyle({
    width: "52px",
    borderRadius: "0px",
  });
  expect(container.querySelectorAll('[data-part="line"]')).toHaveLength(4);
  expect(
    getComputedStyle(container.querySelector('[data-part="line"]')!).animation,
  ).toContain("wave");
});
it("Card preset padding and content animation are applied rather than forwarded as unknown host props", () => {
  const { container } = render(
    <M.Card padding="small" variant="elevated">
      <M.CardContent padding="none" animation="zoomIn">
        Body
      </M.CardContent>
    </M.Card>,
  );
  expect(container.firstElementChild).toHaveStyle({ padding: "8px" });
  const body = container.querySelector('[data-part="content"]')!;
  expect(body).toHaveStyle({ padding: "0px" });
  expect(getComputedStyle(body).animation).toContain("mn-alert-zoom");
  expect(body).not.toHaveAttribute("animation");
});
it("Tabs passes semantic color to tabs and exposes vertical direction without leaking behavioral props", () => {
  const { container } = render(
    <M.Tabs
      defaultValue="one"
      orientation="vertical"
      color="danger"
      dir="rtl"
      activationMode="manual"
    >
      <M.TabList>
        <M.Tab value="one">One</M.Tab>
        <M.Tab value="two" color="success">
          Two
        </M.Tab>
      </M.TabList>
    </M.Tabs>,
  );
  expect(screen.getByRole("tab", { name: "One" })).toHaveClass(
    "mn-color-danger",
  );
  expect(screen.getByRole("tab", { name: "Two" })).toHaveClass(
    "mn-color-success",
  );
  expect(screen.getByRole("tablist")).toHaveAttribute(
    "aria-orientation",
    "vertical",
  );
  expect(getComputedStyle(screen.getByRole("tablist")).flexDirection).toBe(
    "column",
  );
  expect(container.firstElementChild).toHaveStyle({ direction: "rtl" });
  expect(container.firstElementChild).not.toHaveAttribute("activationMode");
});
it("Rating applies its size and descriptive accessible name without forwarding size to native View", () => {
  const { container } = render(<M.Rating value={7} size="large" />);
  expect(
    screen.getByRole("radiogroup", { name: "7.0 / 10" }),
  ).toBeInTheDocument();
  expect(screen.getAllByRole("radio")[0]).toHaveStyle({ fontSize: "20px" });
  expect(container.firstElementChild).not.toHaveAttribute("size");
});
it("Steps and the toast viewport use provider labels and allow explicit overrides", () => {
  const { rerender } = render(
    <M.ConfigProvider locale={{ language: "zh" }}>
      <M.Steps items={[{ title: "第一步" }]} />
      <M.ToastProvider />
    </M.ConfigProvider>,
  );
  expect(screen.getByRole("region", { name: "通知" })).toBeInTheDocument();
  expect(screen.getByLabelText("步骤")).toBeInTheDocument();
  rerender(<M.ToastProvider aria-label="Activity" />);
  expect(screen.getByRole("region", { name: "Activity" })).toBeInTheDocument();
});
it("Button border radius presets resolve theme tokens rather than discarding the accepted value", () => {
  const { rerender } = render(<M.Button borderRadius="small">Action</M.Button>);
  expect(
    screen.getByRole("button", { name: "Action" }).style.borderRadius,
  ).toBe("var(--radius-sm, 4px)");
  rerender(<M.Button borderRadius="large">Action</M.Button>);
  expect(
    screen.getByRole("button", { name: "Action" }).style.borderRadius,
  ).toBe("var(--radius-lg, 12px)");
});
it("Tag native ripple uses measured touch coordinates and cancels deferred work when removed", () => {
  vi.useFakeTimers();
  const query = vi.spyOn(Taro, "createSelectorQuery").mockImplementation(() => {
    const q = {
      select: () => q,
      boundingClientRect: (callback: (rect: unknown) => void) => {
        callback({ width: 100, height: 30, left: 20, top: 40 });
        return q;
      },
      exec: () => {},
    };
    return q as unknown as ReturnType<typeof Taro.createSelectorQuery>;
  });
  const { container, unmount } = render(<M.Tag clickable>Tag</M.Tag>);
  fireEvent.click(screen.getByRole("button", { name: "Tag" }), {
    clientX: 45,
    clientY: 50,
    detail: 1,
  });
  expect(container.querySelector(".mn-tag-ripple")).toHaveStyle({
    width: "100px",
    height: "100px",
    left: "-25px",
    top: "-40px",
  });
  expect(query).toHaveBeenCalled();
  unmount();
  act(() => vi.runAllTimers());
  vi.useRealTimers();
});
it("Tooltip subtle surface, rounded shape and public color overrides are real styles", () => {
  render(
    <M.Tooltip
      open
      content="Hint"
      variant="subtle"
      color="success"
      shape="rounded"
    >
      <M.Button>Tip</M.Button>
    </M.Tooltip>,
  );
  const tip = screen.getByRole("tooltip");
  expect(getComputedStyle(tip).borderTopWidth).toBe("1px");
  expect(getComputedStyle(tip).borderRadius).toBe("16px");
  tip.style.setProperty("--tooltip-bg", "rgb(1, 2, 3)");
  tip.style.setProperty("--tooltip-color", "rgb(4, 5, 6)");
  expect(getComputedStyle(tip).backgroundColor).toBe("rgb(1, 2, 3)");
  expect(getComputedStyle(tip).color).toBe("rgb(4, 5, 6)");
});
