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
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  type TabsColor,
  type TabsProps,
} from ".";

const COLORS: TabsColor[] = [
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
      "ui-tabs-list",
      "list",
      "lineList",
    );
    const overview = screen.getByRole("tab", { name: "Overview" });
    expect(overview).toHaveAttribute("aria-selected", "true");
    expect(overview).toHaveClass("ui-tabs-trigger", "trigger", "lineTrigger");
    const panel = screen.getByRole("tabpanel", { name: "Overview" });
    expect(panel).toHaveTextContent("Overview panel");
    expect(panel).toHaveClass("ui-tabs-content", "panel");
    expect(overview).toHaveAttribute("aria-controls", panel.id);
    expect(screen.queryByText("Reviews panel")).toBeNull();
  });

  it("applies default variant, color and orientation classes", () => {
    renderTabs();
    expect(screen.getByTestId("tabs")).toHaveClass(
      "ui-tabs",
      "ui-tabs-variant-line",
      "ui-tabs-color-brand",
      "ui-tabs-orientation-horizontal",
      "tabs",
      "primary",
    );
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
    expect(screen.getByTestId("tabs")).toHaveClass(
      "ui-tabs-orientation-vertical",
      "ui-tabs-variant-pills",
      "ui-tabs-color-danger",
      "vertical",
      "danger",
    );
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
    expect(rootRef.current).toHaveClass("ui-tabs");
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
    const hooks = ["brand", "gray", "success", "warning", "danger", "info"];
    COLORS.forEach((color, index) => {
      expect(tabs[index]).toHaveClass(
        `ui-tabs-color-${hooks[index]}`,
        color,
        "colored",
      );
      expect(tabs[index].hasAttribute("color")).toBe(false);
    });
    expect(tabs[6].className).not.toMatch(/ui-tabs-color-|colored/);
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
      expect(root).toHaveClass("ui-tabs-variant-pills", color);
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

  it("maps every color to Minerva role tokens and keeps the public custom properties", () => {
    expect(css).toContain(
      ".primary{--ui-tabs-accent: var(--primary-color);--ui-tabs-selected-bg: var(--primary-color-subtle);--ui-tabs-selected-fg: var(--primary-color-text)}",
    );
    for (const role of ["success", "warning", "danger", "info"]) {
      expect(css).toContain(
        `.${role}{--ui-tabs-accent: var(--${role}-color);--ui-tabs-selected-bg: var(--${role}-color-subtle);--ui-tabs-selected-fg: var(--${role}-color-text)}`,
      );
    }
    expect(css).toContain(
      ".neutral{--ui-tabs-accent: var(--text-secondary-color)",
    );
  });

  it("keeps explicit colors readable and selection distinct: colored pills invert without borders", () => {
    expect(css).toMatch(
      /\.trigger\.colored\{background-color:var\(--ui-tabs-selected-bg\);color:var\(--ui-tabs-selected-fg\)/,
    );
    expect(css).toMatch(/\.trigger\.colored\.pillsTrigger\{border:none\}/);
    expect(css).toMatch(
      /\.trigger\.colored\.pillsTrigger\[data-state=active\]\{background-color:var\(--ui-tabs-selected-fg\);color:var\(--ui-tabs-selected-bg\)\}/,
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
