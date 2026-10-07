import { createRef } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { join } from "node:path";
import { compile } from "sass";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Tab, TabList, TabPanel, Tabs, type TabsProps } from ".";

const COLORS: NonNullable<TabsProps["color"]>[] = [
  "primary",
  "neutral",
  "success",
  "warning",
  "danger",
  "info",
];

function renderTabs(props: Partial<TabsProps> = {}) {
  return render(
    <Tabs defaultValue="overview" data-testid="tabs" {...props}>
      <TabList aria-label="Book sections">
        <Tab value="overview">Overview</Tab>
        <Tab value="rules" disabled>
          Rules
        </Tab>
        <Tab value="reviews">Reviews</Tab>
      </TabList>
      <TabPanel value="overview">Overview panel</TabPanel>
      <TabPanel value="rules">Rules panel</TabPanel>
      <TabPanel value="reviews">Reviews panel</TabPanel>
    </Tabs>,
  );
}

describe("Tabs", () => {
  it("wires tablist, tabs and the default panel accessibly", () => {
    renderTabs();
    expect(screen.getByRole("tablist", { name: "Book sections" })).toHaveClass(
      "list",
      "lineList",
    );
    const overview = screen.getByRole("tab", { name: "Overview" });
    expect(overview).toHaveAttribute("aria-selected", "true");
    expect(overview).toHaveClass("trigger", "lineTrigger");
    const panel = screen.getByRole("tabpanel", { name: "Overview" });
    expect(panel).toHaveTextContent("Overview panel");
    expect(panel).toHaveClass("panel");
    expect(overview).toHaveAttribute("aria-controls", panel.id);
    expect(screen.queryByText("Reviews panel")).toBeNull();
  });

  it("applies default variant, color and orientation classes", () => {
    renderTabs();
    expect(screen.getByTestId("tabs")).toHaveClass("tabs", "primary");
    expect(screen.getByTestId("tabs")).not.toHaveClass("vertical");
  });

  it("switches panels on click in uncontrolled mode and reports the value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTabs({ onChange });
    await user.click(screen.getByRole("tab", { name: "Reviews" }));
    expect(onChange).toHaveBeenCalledWith("reviews");
    expect(screen.getByRole("tab", { name: "Reviews" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Reviews panel");
  });

  it("moves with arrow keys, skipping disabled tabs, and activates on focus", async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.tab();
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    const reviews = screen.getByRole("tab", { name: "Reviews" });
    expect(reviews).toHaveFocus();
    expect(reviews).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveFocus();
  });

  it("does not select a disabled tab on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderTabs({ onChange });
    const rules = screen.getByRole("tab", { name: "Rules" });
    expect(rules).toBeDisabled();
    await user.click(rules);
    expect(onChange).not.toHaveBeenCalled();
    expect(rules).toHaveAttribute("aria-selected", "false");
  });

  it("uses vertical orientation for keyboard navigation and classes", async () => {
    const user = userEvent.setup();
    renderTabs({ orientation: "vertical", variant: "pills", color: "danger" });
    expect(screen.getByTestId("tabs")).toHaveClass("vertical", "danger");
    expect(screen.getByRole("tablist")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
    expect(screen.getByRole("tablist")).toHaveClass(
      "pillsList",
      "verticalList",
    );
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveClass(
      "pillsTrigger",
      "verticalTrigger",
    );
    await user.tab();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("tab", { name: "Reviews" })).toHaveFocus();
  });

  it("forwards refs for root, list, tab and panel", () => {
    const rootRef = createRef<HTMLDivElement>();
    const listRef = createRef<HTMLDivElement>();
    const tabRef = createRef<HTMLButtonElement>();
    const panelRef = createRef<HTMLDivElement>();
    render(
      <Tabs ref={rootRef} defaultValue="a">
        <TabList ref={listRef}>
          <Tab ref={tabRef} value="a">
            A
          </Tab>
        </TabList>
        <TabPanel ref={panelRef} value="a">
          Panel
        </TabPanel>
      </Tabs>,
    );
    expect(rootRef.current).toHaveClass("tabs");
    expect(listRef.current).toBe(screen.getByRole("tablist"));
    expect(tabRef.current).toBe(screen.getByRole("tab", { name: "A" }));
    expect(panelRef.current).toBe(screen.getByRole("tabpanel"));
  });

  it("keeps an inactive panel mounted with forceMount", () => {
    render(
      <Tabs defaultValue="a">
        <TabList aria-label="L">
          <Tab value="a">A</Tab>
          <Tab value="b">B</Tab>
        </TabList>
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b" forceMount>
          Panel B
        </TabPanel>
      </Tabs>,
    );
    const hidden = screen.getByText("Panel B");
    expect(hidden).toHaveAttribute("data-state", "inactive");
    expect(hidden).toHaveAttribute("role", "tabpanel");
  });

  it("applies per-tab semantic colors without leaking props or changing controlled selection", () => {
    const onChange = vi.fn();
    render(
      <Tabs
        variant="pills"
        color="danger"
        value="primary"
        onChange={onChange}
        activationMode="manual"
      >
        <TabList aria-label="Languages">
          {COLORS.map((color) => (
            <Tab
              key={color}
              value={color}
              color={color}
              disabled={color === "neutral"}
            >
              {color}
            </Tab>
          ))}
          <Tab value="inherited">Inherited</Tab>
        </TabList>
        <TabPanel value="primary">Editor</TabPanel>
      </Tabs>,
    );
    const tabs = screen.getAllByRole<HTMLButtonElement>("tab");
    COLORS.forEach((color, index) => {
      expect(tabs[index]).toHaveClass(color, "colored");
      expect(tabs[index].hasAttribute("color")).toBe(false);
    });
    expect(tabs[6]).not.toHaveClass("colored", "danger");
    fireEvent.keyDown(tabs[2], { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith("success");
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
    expect(tabs[1].disabled).toBe(true);
    fireEvent.click(tabs[1]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("supports separated pill tabs with a configurable semantic color", () => {
    for (const color of COLORS) {
      const { container, unmount } = render(
        <Tabs variant="pills" color={color} defaultValue="en">
          <TabList aria-label="Languages">
            <Tab value="en">English</Tab>
          </TabList>
          <TabPanel value="en">Translation editor</TabPanel>
        </Tabs>,
      );
      const root = container.firstElementChild as HTMLElement;
      expect(root).toHaveClass(color);
      expect(screen.getByRole("tablist")).toHaveClass("pillsList");
      expect(root.hasAttribute("color")).toBe(false);
      unmount();
    }
  });

  it("connects the selected language to its editor and leaves controlled changes to the parent", () => {
    const onChange = vi.fn();
    const ui = (value: string) => (
      <Tabs value={value} onChange={onChange} activationMode="manual">
        <TabList aria-label="Languages">
          <Tab value="en">English</Tab>
          <Tab value="ja">Japanese</Tab>
          <Tab value="de" disabled>
            German
          </Tab>
        </TabList>
        <TabPanel value={value}>Editor: {value}</TabPanel>
      </Tabs>
    );
    const { rerender } = render(ui("en"));
    const tabs = screen.getAllByRole<HTMLButtonElement>("tab");
    fireEvent.keyDown(tabs[1], { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith("ja");
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
    fireEvent.click(tabs[2]);
    expect(onChange).toHaveBeenCalledTimes(1);
    rerender(ui("ja"));
    const panel = screen.getByRole("tabpanel");
    expect(panel.id).toBe(tabs[1].getAttribute("aria-controls"));
    expect(panel.getAttribute("aria-labelledby")).toBe(tabs[1].id);
    expect(panel.textContent).toBe("Editor: ja");
  });
});

describe("TabList reveal", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const rect = (left: number, right: number, top = 0, bottom = 10) =>
    ({
      left,
      right,
      top,
      bottom,
      width: right - left,
      height: bottom - top,
    }) as DOMRect;

  it("scrolls only the list to reveal the selected tab (horizontal and vertical)", async () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function (this: HTMLElement) {
        if (this.getAttribute("role") === "tablist")
          return rect(0, 100, 0, 100);
        if (this.textContent === "Far") return rect(150, 200, 150, 200);
        if (this.textContent === "Before") return rect(-50, -10, -50, -10);
        return rect(0, 50, 0, 50);
      },
    );
    const ui = (value: string, orientation: TabsProps["orientation"]) => (
      <Tabs value={value} orientation={orientation}>
        <TabList aria-label="L">
          <Tab value="before">Before</Tab>
          <Tab value="a">A</Tab>
          <Tab value="far">Far</Tab>
        </TabList>
      </Tabs>
    );
    const h = render(ui("far", "horizontal"));
    const list = screen.getByRole("tablist");
    expect(list.scrollLeft).toBe(100);
    list.scrollLeft = 200;
    h.rerender(ui("before", "horizontal"));
    // A mutation observer reacts to the data-state change.
    await waitFor(() => expect(list.scrollLeft).toBe(150));
    list.scrollLeft = 200;
    h.rerender(ui("a", "horizontal"));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(list.scrollLeft).toBe(200); // already visible: untouched
    h.unmount();

    const v = render(ui("far", "vertical"));
    const vlist = screen.getByRole("tablist");
    expect(vlist.scrollTop).toBe(100);
    vlist.scrollTop = 200;
    v.rerender(ui("before", "vertical"));
    await waitFor(() => expect(vlist.scrollTop).toBe(150));
    vlist.scrollTop = 200;
    v.rerender(ui("a", "vertical"));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(vlist.scrollTop).toBe(200);
    v.unmount();
  });

  it("ignores lists without a selected tab and works without ResizeObserver", () => {
    const original = globalThis.ResizeObserver;
    // @ts-expect-error simulate an environment without ResizeObserver
    delete globalThis.ResizeObserver;
    try {
      const { unmount } = render(
        <Tabs>
          <TabList aria-label="L">
            <Tab value="a">A</Tab>
          </TabList>
        </Tabs>,
      );
      expect(screen.getByRole("tablist").scrollLeft).toBe(0);
      act(() => unmount());
    } finally {
      globalThis.ResizeObserver = original;
    }
  });
});

describe("Tabs styles", () => {
  const css = compile(join(import.meta.dirname, "tabs.module.scss"), {
    style: "compressed",
  }).css;

  it("maps every color to Minerva role tokens through the tabs custom properties", () => {
    expect(css).toContain(
      ".primary{--tabs-accent: var(--primary-color);--tabs-selected-bg: var(--primary-color-subtle);--tabs-selected-fg: var(--primary-color-text)}",
    );
    for (const role of ["success", "warning", "danger", "info"]) {
      expect(css).toContain(
        `.${role}{--tabs-accent: var(--${role}-color);--tabs-selected-bg: var(--${role}-color-subtle);--tabs-selected-fg: var(--${role}-color-text)}`,
      );
    }
    expect(css).toContain(
      ".neutral{--tabs-accent: var(--text-secondary-color)",
    );
  });

  it("keeps explicit colors readable and selection distinct: colored pills invert without borders", () => {
    expect(css).toMatch(
      /\.trigger\.colored\{background-color:var\(--tabs-selected-bg\);color:var\(--tabs-selected-fg\)/,
    );
    expect(css).toMatch(/\.trigger\.colored\.pillsTrigger\{border:none\}/);
    expect(css).toMatch(
      /\.trigger\.colored\.pillsTrigger\[data-state=active\]\{background-color:var\(--tabs-selected-fg\);color:var\(--tabs-selected-bg\)\}/,
    );
    expect(css).toMatch(/\.trigger:disabled\{opacity:\.5/);
  });

  it("does not apply colored pill selection to nested non-pill variants", () => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.append(style);
    const inspect = () => {
      const tab = document.querySelector('[aria-label="Nested"] [role="tab"]')!;
      const computed = getComputedStyle(tab);
      return [
        computed.backgroundColor,
        computed.color,
        computed.borderBottomStyle,
        computed.borderBottomWidth,
      ];
    };
    try {
      for (const variant of ["line", "enclosed", "soft"] as const) {
        const inner = (
          <Tabs variant={variant} value="inner">
            <TabList aria-label="Nested">
              <Tab value="inner" color="warning">
                Inner
              </Tab>
            </TabList>
          </Tabs>
        );
        const standalone = render(inner);
        const expected = inspect();
        standalone.unmount();
        const nested = render(
          <Tabs variant="pills" value="outer">
            <TabList aria-label="Outer">
              <Tab value="outer">Outer</Tab>
            </TabList>
            <TabPanel value="outer">{inner}</TabPanel>
          </Tabs>,
        );
        expect(inspect(), variant).toEqual(expected);
        expect(
          document.querySelector('[aria-label="Nested"] [role="tab"]'),
        ).not.toHaveClass("pillsTrigger");
        nested.unmount();
      }
    } finally {
      style.remove();
    }
  });
});

describe("Tabs keyboard, focus and accessibility", () => {
  function Basic(
    props: Partial<TabsProps> & {
      loop?: boolean;
      disabled?: string[];
      forceMount?: boolean;
    },
  ) {
    const { loop, disabled = [], forceMount, ...rest } = props;
    return (
      <Tabs defaultValue="a" {...rest}>
        <TabList aria-label="Letters" loop={loop}>
          {["a", "b", "c", "d"].map((v) => (
            <Tab key={v} value={v} disabled={disabled.includes(v)}>
              {v.toUpperCase()}
            </Tab>
          ))}
        </TabList>
        {["a", "b", "c", "d"].map((v) => (
          <TabPanel key={v} value={v} forceMount={forceMount}>
            Panel {v}
          </TabPanel>
        ))}
      </Tabs>
    );
  }
  const tab = (name: string) => screen.getByRole("tab", { name });
  const selectedName = () =>
    screen.getByRole("tab", { selected: true }).textContent;

  it("moves with ArrowRight / ArrowLeft horizontally and ignores Up / Down", async () => {
    const user = userEvent.setup();
    render(<Basic />);
    await user.tab();
    await user.keyboard("{ArrowRight}");
    expect(tab("B")).toHaveFocus();
    await user.keyboard("{ArrowDown}{ArrowUp}");
    expect(tab("B")).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(tab("A")).toHaveFocus();
    expect(selectedName()).toBe("A");
  });

  it("moves with ArrowDown / ArrowUp vertically and ignores Left / Right", async () => {
    const user = userEvent.setup();
    render(<Basic orientation="vertical" />);
    await user.tab();
    await user.keyboard("{ArrowDown}");
    expect(tab("B")).toHaveFocus();
    await user.keyboard("{ArrowRight}{ArrowLeft}");
    expect(tab("B")).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(tab("A")).toHaveFocus();
  });

  it("swaps Left / Right in RTL and sets dir on the root", async () => {
    const user = userEvent.setup();
    render(<Basic dir="rtl" data-testid="root" />);
    expect(screen.getByTestId("root")).toHaveAttribute("dir", "rtl");
    await user.tab();
    await user.keyboard("{ArrowLeft}");
    expect(tab("B")).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(tab("A")).toHaveFocus();
  });

  it("Home / End jump to the first / last enabled tab", async () => {
    const user = userEvent.setup();
    render(<Basic disabled={["a", "d"]} defaultValue="b" />);
    await user.tab();
    expect(tab("B")).toHaveFocus();
    await user.keyboard("{End}");
    expect(tab("C")).toHaveFocus();
    await user.keyboard("{Home}");
    expect(tab("B")).toHaveFocus();
  });

  it("wraps by default and stops at the ends with loop={false}", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Basic />);
    await user.tab();
    await user.keyboard("{ArrowLeft}");
    expect(tab("D")).toHaveFocus();
    unmount();

    render(<Basic loop={false} />);
    await user.tab();
    await user.keyboard("{ArrowLeft}");
    expect(tab("A")).toHaveFocus();
    await user.keyboard("{End}{ArrowRight}");
    expect(tab("D")).toHaveFocus();
  });

  it("skips disabled tabs in both directions", async () => {
    const user = userEvent.setup();
    render(<Basic disabled={["b", "c"]} />);
    await user.tab();
    await user.keyboard("{ArrowRight}");
    expect(tab("D")).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(tab("A")).toHaveFocus();
    expect(tab("B")).toHaveAttribute("data-disabled", "");
    expect(tab("A")).not.toHaveAttribute("data-disabled");
  });

  it("automatic activation selects the focused tab", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Basic onChange={onChange} />);
    await user.tab();
    expect(onChange).not.toHaveBeenCalled();
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith("b");
    expect(selectedName()).toBe("B");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel b");
  });

  it("manual activation moves focus only; Enter / Space / click select", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Basic activationMode="manual" onChange={onChange} />);
    await user.tab();
    await user.keyboard("{ArrowRight}");
    expect(tab("B")).toHaveFocus();
    expect(selectedName()).toBe("A");
    expect(onChange).not.toHaveBeenCalled();
    await user.keyboard("{Enter}");
    expect(selectedName()).toBe("B");
    await user.keyboard("{ArrowRight}");
    await user.keyboard(" ");
    expect(selectedName()).toBe("C");
    await user.click(tab("D"));
    expect(selectedName()).toBe("D");
    expect(onChange.mock.calls).toEqual([["b"], ["c"], ["d"]]);
  });

  it("selects on primary mouse down only (not right / ctrl click)", () => {
    const onChange = vi.fn();
    render(<Basic onChange={onChange} activationMode="manual" />);
    fireEvent.mouseDown(tab("B"), { button: 2 });
    fireEvent.mouseDown(tab("B"), { button: 0, ctrlKey: true });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.mouseDown(tab("B"), { button: 0 });
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("selects on an assistive-technology click (no mouse down)", () => {
    render(<Basic activationMode="manual" />);
    fireEvent.click(tab("C"), { detail: 0 });
    expect(selectedName()).toBe("C");
  });

  it("lets consumers cancel built-in behaviour with preventDefault", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="a">
        <TabList aria-label="L" onKeyDown={(e) => e.preventDefault()}>
          <Tab value="a">A</Tab>
          <Tab value="b" onMouseDown={(e) => e.preventDefault()}>
            B
          </Tab>
        </TabList>
      </Tabs>,
    );
    await user.tab();
    await user.keyboard("{ArrowRight}");
    expect(tab("A")).toHaveFocus();
    fireEvent.mouseDown(tab("B"));
    expect(selectedName()).toBe("A");
  });

  it("roves tabIndex: only the selected tab, else the first enabled tab, is tabbable", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Basic defaultValue="c" />);
    expect(
      screen.getAllByRole("tab").map((t) => t.getAttribute("tabindex")),
    ).toEqual(["-1", "-1", "0", "-1"]);
    await user.click(tab("B"));
    expect(tab("B")).toHaveAttribute("tabindex", "0");
    expect(tab("C")).toHaveAttribute("tabindex", "-1");
    unmount();

    render(<Basic defaultValue={undefined} disabled={["a"]} />);
    expect(
      screen.getAllByRole("tab").map((t) => t.getAttribute("tabindex")),
    ).toEqual(["-1", "0", "-1", "-1"]);
    await user.tab();
    expect(tab("B")).toHaveFocus();
  });

  it("falls back to the first enabled tab when the selected tab is disabled", () => {
    render(<Basic defaultValue="a" disabled={["a"]} />);
    expect(tab("B")).toHaveAttribute("tabindex", "0");
    expect(tab("A")).toHaveAttribute("tabindex", "-1");
  });

  it("updates the fallback tab stop when tabs are (un)disabled later", async () => {
    const { rerender } = render(
      <Basic defaultValue={undefined} disabled={["a"]} />,
    );
    expect(tab("B")).toHaveAttribute("tabindex", "0");
    rerender(<Basic defaultValue={undefined} />);
    await waitFor(() => expect(tab("A")).toHaveAttribute("tabindex", "0"));
    expect(tab("B")).toHaveAttribute("tabindex", "-1");
  });

  it("wires aria ids, orientation and data attributes", () => {
    render(<Basic orientation="vertical" data-testid="root" />);
    const list = screen.getByRole("tablist");
    expect(list).toHaveAttribute("aria-orientation", "vertical");
    expect(list).toHaveAttribute("data-orientation", "vertical");
    expect(screen.getByTestId("root")).toHaveAttribute(
      "data-orientation",
      "vertical",
    );
    const a = tab("A");
    const panel = screen.getByRole("tabpanel");
    expect(a.id).toBeTruthy();
    expect(a).toHaveAttribute("type", "button");
    expect(a).toHaveAttribute("aria-controls", panel.id);
    expect(panel).toHaveAttribute("aria-labelledby", a.id);
    expect(panel).toHaveAccessibleName("A");
    expect(panel).toHaveAttribute("tabindex", "0");
    expect(panel).toHaveAttribute("data-state", "active");
    expect(panel).not.toHaveAttribute("hidden");
    expect(a).toHaveAttribute("data-state", "active");
    expect(a).toHaveAttribute("data-orientation", "vertical");
    expect(tab("B")).toHaveAttribute("data-state", "inactive");
    expect(tab("B")).toHaveAttribute("aria-selected", "false");
    expect(tab("B").id).not.toBe(a.id);
  });

  it("unmounts inactive panels unless forceMount, which hides them", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Basic />);
    expect(screen.queryByText("Panel b")).toBeNull();
    unmount();

    render(<Basic forceMount />);
    const b = screen.getByText("Panel b");
    expect(b).toHaveAttribute("hidden");
    expect(b).toHaveAttribute("data-state", "inactive");
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
    await user.click(tab("B"));
    expect(b).not.toHaveAttribute("hidden");
    expect(screen.getByText("Panel a")).toHaveAttribute("hidden");
  });

  it("keeps a controlled selection when the parent ignores onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Basic defaultValue={undefined} value="a" onChange={onChange} />);
    await user.click(tab("C"));
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledWith("c");
    expect(onChange).toHaveBeenCalledWith("d");
    expect(selectedName()).toBe("A");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel a");
  });

  it("isolates nested Tabs: own selection, ids and keyboard", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="o1">
        <TabList aria-label="Outer">
          <Tab value="o1">O1</Tab>
          <Tab value="o2">O2</Tab>
        </TabList>
        <TabPanel value="o1">
          <Tabs defaultValue="o1">
            <TabList aria-label="Inner">
              <Tab value="o1">I1</Tab>
              <Tab value="o2">I2</Tab>
            </TabList>
            <TabPanel value="o1">Inner one</TabPanel>
            <TabPanel value="o2">Inner two</TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel value="o2">Outer two</TabPanel>
      </Tabs>,
    );
    // Same values, distinct ids.
    expect(tab("O1").id).not.toBe(tab("I1").id);
    expect(screen.getByRole("tabpanel", { name: "I1" })).toHaveTextContent(
      "Inner one",
    );
    await user.click(tab("I1"));
    await user.keyboard("{ArrowRight}");
    expect(tab("I2")).toHaveFocus();
    expect(tab("I2")).toHaveAttribute("aria-selected", "true");
    expect(tab("O1")).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{End}{Home}");
    expect(tab("I1")).toHaveFocus();
    expect(tab("O1")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Inner one")).toBeInTheDocument();
  });

  it("renders on the server with matching aria wiring", async () => {
    const { renderToString } = await import("react-dom/server");
    const html = renderToString(<Basic forceMount />);
    const host = document.createElement("div");
    host.innerHTML = html;
    const tabs = host.querySelectorAll('[role="tab"]');
    const panels = host.querySelectorAll('[role="tabpanel"]');
    expect(host.querySelector('[role="tablist"]')).toHaveAttribute(
      "aria-orientation",
      "horizontal",
    );
    expect(tabs).toHaveLength(4);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(tabs[0]).toHaveAttribute("tabindex", "0");
    expect(tabs[1]).toHaveAttribute("tabindex", "-1");
    expect(tabs[0].getAttribute("aria-controls")).toBe(panels[0].id);
    expect(panels[0].getAttribute("aria-labelledby")).toBe(tabs[0].id);
    expect(panels[1]).toHaveAttribute("hidden");
  });
});
