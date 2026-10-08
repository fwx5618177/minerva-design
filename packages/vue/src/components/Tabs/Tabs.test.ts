import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, nextTick, ref, type PropType } from "vue";
import { renderToString } from "vue/server-renderer";
import { createSSRApp } from "vue";
import { Tab, TabList, TabPanel, Tabs, type TabsProps } from ".";

const LETTERS = ["a", "b", "c", "d"];

/** Four tabs a-d with their panels */
const Basic = defineComponent({
  props: {
    tabs: { type: Object as PropType<Partial<TabsProps>>, default: () => ({}) },
    loop: { type: Boolean, default: true },
    disabled: { type: Array as PropType<string[]>, default: () => [] },
    forceMount: Boolean,
    onChange: Function as PropType<(value: string) => void>,
  },
  setup(props, { attrs }) {
    return () =>
      h(
        Tabs,
        {
          defaultValue: "a",
          ...attrs,
          ...props.tabs,
          onChange: props.onChange,
        },
        () => [
          h(TabList, { "aria-label": "Letters", loop: props.loop }, () =>
            LETTERS.map((v) =>
              h(
                Tab,
                { key: v, value: v, disabled: props.disabled.includes(v) },
                () => v.toUpperCase(),
              ),
            ),
          ),
          ...LETTERS.map((v) =>
            h(
              TabPanel,
              { key: v, value: v, forceMount: props.forceMount },
              () => `Panel ${v}`,
            ),
          ),
        ],
      );
  },
});

const tab = (name: string) => screen.getByRole("tab", { name });
const selectedName = () =>
  screen.getByRole("tab", { selected: true }).textContent;

describe("Tabs", () => {
  it("wires tablist, tabs and panels accessibly with the default classes and hooks", () => {
    render(Basic, { attrs: { "data-testid": "root" } });
    const root = screen.getByTestId("root");
    expect(root).toHaveClass("tabs", "primary");
    expect(root).toHaveAttribute("data-minerva", "tabs");
    expect(root).toHaveAttribute("data-part", "root");
    expect(root).toHaveAttribute("data-variant", "line");
    expect(root).toHaveAttribute("data-color", "primary");
    const list = screen.getByRole("tablist", { name: "Letters" });
    expect(list).toHaveClass("list", "lineList");
    expect(list).toHaveAttribute("data-part", "list");
    expect(list).toHaveAttribute("aria-orientation", "horizontal");
    const a = tab("A");
    expect(a).toHaveClass("trigger", "lineTrigger");
    expect(a).toHaveAttribute("data-minerva", "tab");
    expect(a).toHaveAttribute("aria-selected", "true");
    expect(a).toHaveAttribute("type", "button");
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveTextContent("Panel a");
    expect(panel).toHaveClass("panel");
    expect(a).toHaveAttribute("aria-controls", panel.id);
    expect(panel).toHaveAttribute("aria-labelledby", a.id);
    expect(panel).toHaveAccessibleName("A");
    expect(panel).toHaveAttribute("tabindex", "0");
    expect(panel).toHaveAttribute("data-minerva", "tab-panel");
    expect(panel).toHaveAttribute("data-state", "active");
    expect(tab("B")).toHaveAttribute("data-state", "inactive");
    expect(tab("B")).toHaveAttribute("aria-selected", "false");
  });

  it("switches panels on click (uncontrolled) and emits change + update:modelValue", async () => {
    const user = userEvent.setup();
    const { emitted } = render(Tabs, {
      props: { defaultValue: "a" },
      slots: {
        default: () => [
          h(TabList, null, () => [
            h(Tab, { value: "a" }, () => "A"),
            h(Tab, { value: "b" }, () => "B"),
          ]),
          h(TabPanel, { value: "a" }, () => "Panel A"),
          h(TabPanel, { value: "b" }, () => "Panel B"),
        ],
      },
    });
    await user.click(tab("B"));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel B");
    expect(screen.queryByText("Panel A")).toBeNull();
    expect(emitted("change")).toEqual([["b"]]);
    expect(emitted("update:modelValue")).toEqual([["b"]]);
  });

  it("supports v-model", async () => {
    const user = userEvent.setup();
    const value = ref("b");
    render(
      defineComponent({
        setup: () => () =>
          h(
            Tabs,
            {
              modelValue: value.value,
              "onUpdate:modelValue": (v: string) => (value.value = v),
            },
            () => [
              h(TabList, null, () => [
                h(Tab, { value: "a" }, () => "A"),
                h(Tab, { value: "b" }, () => "B"),
              ]),
              h(TabPanel, { value: "a" }, () => "Panel A"),
              h(TabPanel, { value: "b" }, () => "Panel B"),
            ],
          ),
      }),
    );
    expect(selectedName()).toBe("B");
    await user.click(tab("A"));
    expect(value.value).toBe("a");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel A");
    value.value = "b";
    await nextTick();
    expect(selectedName()).toBe("B");
  });

  it("keeps a controlled selection when the parent ignores the change", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(Basic, {
      props: { tabs: { defaultValue: undefined, modelValue: "a" }, onChange },
    });
    await user.click(tab("C"));
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledWith("c");
    expect(onChange).toHaveBeenCalledWith("d");
    expect(selectedName()).toBe("A");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel a");
  });

  it("does not select a disabled tab on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(Basic, { props: { disabled: ["b"], onChange } });
    expect(tab("B")).toBeDisabled();
    expect(tab("B")).toHaveAttribute("data-disabled", "");
    await user.click(tab("B"));
    fireEvent.keyDown(tab("B"), { key: "Enter" });
    fireEvent.click(tab("B"), { detail: 0 });
    expect(onChange).not.toHaveBeenCalled();
    expect(selectedName()).toBe("A");
  });

  it("applies variant, orientation and per-tab color classes", () => {
    render(Tabs, {
      props: {
        defaultValue: "a",
        variant: "pills",
        orientation: "vertical",
        color: "danger",
      },
      attrs: { "data-testid": "root" },
      slots: {
        default: () =>
          h(TabList, null, () => [
            h(Tab, { value: "a" }, () => "A"),
            h(Tab, { value: "b", color: "success" }, () => "B"),
          ]),
      },
    });
    expect(screen.getByTestId("root")).toHaveClass(
      "tabs",
      "danger",
      "vertical",
    );
    expect(screen.getByRole("tablist")).toHaveClass(
      "pillsList",
      "verticalList",
    );
    expect(tab("A")).toHaveClass("pillsTrigger", "verticalTrigger");
    expect(tab("A")).not.toHaveClass("colored");
    expect(tab("B")).toHaveClass("success", "colored");
    expect(tab("B")).toHaveAttribute("data-color", "success");
    expect(tab("B")).toHaveAttribute("data-orientation", "vertical");
  });
});

describe("Tabs keyboard, focus and accessibility", () => {
  it("moves with ArrowRight / ArrowLeft horizontally and ignores Up / Down", async () => {
    const user = userEvent.setup();
    render(Basic);
    await user.tab();
    expect(tab("A")).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(tab("B")).toHaveFocus();
    expect(selectedName()).toBe("B");
    await user.keyboard("{ArrowDown}{ArrowUp}");
    expect(tab("B")).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(tab("A")).toHaveFocus();
    // Modifier keys are not ours.
    fireEvent.keyDown(tab("A"), { key: "ArrowRight", ctrlKey: true });
    expect(tab("A")).toHaveFocus();
  });

  it("moves with ArrowDown / ArrowUp vertically and ignores Left / Right", async () => {
    const user = userEvent.setup();
    render(Basic, { props: { tabs: { orientation: "vertical" } } });
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
    render(Basic, {
      props: { tabs: { dir: "rtl" } },
      attrs: { "data-testid": "r" },
    });
    expect(screen.getByTestId("r")).toHaveAttribute("dir", "rtl");
    await user.tab();
    await user.keyboard("{ArrowLeft}");
    expect(tab("B")).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(tab("A")).toHaveFocus();
  });

  it("Home / End jump to the first / last enabled tab, skipping disabled tabs", async () => {
    const user = userEvent.setup();
    render(Basic, { props: { disabled: ["d"] } });
    await user.tab();
    await user.keyboard("{End}");
    expect(tab("C")).toHaveFocus();
    await user.keyboard("{Home}");
    expect(tab("A")).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(tab("C")).toHaveFocus();
  });

  it("wraps by default and stops at the ends with loop=false", async () => {
    const user = userEvent.setup();
    render(Basic, { props: { loop: false } });
    await user.tab();
    await user.keyboard("{ArrowLeft}");
    expect(tab("A")).toHaveFocus();
    await user.keyboard("{End}{ArrowRight}");
    expect(tab("D")).toHaveFocus();
  });

  it("manual activation moves focus only; Enter / Space / click select", async () => {
    const user = userEvent.setup();
    render(Basic, { props: { tabs: { activationMode: "manual" } } });
    await user.tab();
    await user.keyboard("{ArrowRight}");
    expect(tab("B")).toHaveFocus();
    expect(selectedName()).toBe("A");
    await user.keyboard("{Enter}");
    expect(selectedName()).toBe("B");
    await user.keyboard("{ArrowRight}");
    await user.keyboard(" ");
    expect(selectedName()).toBe("C");
    await user.click(tab("D"));
    expect(selectedName()).toBe("D");
  });

  it("selects on primary mouse down only (not right / ctrl click)", async () => {
    const onChange = vi.fn();
    render(Basic, { props: { tabs: { activationMode: "manual" }, onChange } });
    await fireEvent.mouseDown(tab("B"), { button: 2 });
    await fireEvent.mouseDown(tab("B"), { button: 0, ctrlKey: true });
    expect(onChange).not.toHaveBeenCalled();
    await fireEvent.mouseDown(tab("B"), { button: 0 });
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("selects on an assistive-technology click (no mouse down)", async () => {
    render(Basic, { props: { tabs: { activationMode: "manual" } } });
    await fireEvent.click(tab("C"), { detail: 0 });
    expect(selectedName()).toBe("C");
  });

  it("lets consumers cancel built-in behaviour with preventDefault", async () => {
    const user = userEvent.setup();
    render(Tabs, {
      props: { defaultValue: "a" },
      slots: {
        default: () =>
          h(
            TabList,
            { onKeydown: (e: KeyboardEvent) => e.preventDefault() },
            () => [
              h(Tab, { value: "a" }, () => "A"),
              h(
                Tab,
                {
                  value: "b",
                  onMousedown: (e: MouseEvent) => e.preventDefault(),
                  onKeydown: (e: KeyboardEvent) => e.preventDefault(),
                  onClick: (e: MouseEvent) => e.preventDefault(),
                },
                () => "B",
              ),
            ],
          ),
      },
    });
    await user.tab();
    await user.keyboard("{ArrowRight}");
    expect(tab("A")).toHaveFocus();
    await fireEvent.mouseDown(tab("B"));
    await fireEvent.keyDown(tab("B"), { key: "Enter" });
    await fireEvent.click(tab("B"), { detail: 0 });
    expect(selectedName()).toBe("A");
  });

  it("roves tabindex: only the selected tab, else the first enabled tab, is tabbable", async () => {
    const user = userEvent.setup();
    const { unmount } = render(Basic, {
      props: { tabs: { defaultValue: "c" } },
    });
    expect(
      screen.getAllByRole("tab").map((t) => t.getAttribute("tabindex")),
    ).toEqual(["-1", "-1", "0", "-1"]);
    await user.click(tab("B"));
    expect(tab("B")).toHaveAttribute("tabindex", "0");
    expect(tab("C")).toHaveAttribute("tabindex", "-1");
    unmount();

    render(Basic, {
      props: { tabs: { defaultValue: undefined }, disabled: ["a"] },
    });
    await nextTick();
    expect(
      screen.getAllByRole("tab").map((t) => t.getAttribute("tabindex")),
    ).toEqual(["-1", "0", "-1", "-1"]);
    await user.tab();
    expect(tab("B")).toHaveFocus();
  });

  it("falls back to the first enabled tab when the selected tab is disabled and follows (un)disabling", async () => {
    const { rerender } = render(Basic, { props: { disabled: ["a"] } });
    await nextTick();
    expect(tab("B")).toHaveAttribute("tabindex", "0");
    expect(tab("A")).toHaveAttribute("tabindex", "-1");
    await rerender({ disabled: [] });
    await waitFor(() => expect(tab("A")).toHaveAttribute("tabindex", "0"));
    expect(tab("B")).toHaveAttribute("tabindex", "-1");
  });

  it("unmounts inactive panels unless forceMount, which hides them", async () => {
    const user = userEvent.setup();
    const { unmount } = render(Basic);
    expect(screen.queryByText("Panel b")).toBeNull();
    unmount();

    render(Basic, { props: { forceMount: true } });
    const b = screen.getByText("Panel b");
    expect(b).toHaveAttribute("hidden");
    expect(b).toHaveAttribute("data-state", "inactive");
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
    await user.click(tab("B"));
    expect(b).not.toHaveAttribute("hidden");
    expect(screen.getByText("Panel a")).toHaveAttribute("hidden");
  });

  it("isolates nested Tabs: own selection, ids and keyboard", async () => {
    const user = userEvent.setup();
    render(Tabs, {
      props: { defaultValue: "o1" },
      slots: {
        default: () => [
          h(TabList, { "aria-label": "Outer" }, () => [
            h(Tab, { value: "o1" }, () => "O1"),
            h(Tab, { value: "o2" }, () => "O2"),
          ]),
          h(TabPanel, { value: "o1" }, () =>
            h(Tabs, { defaultValue: "o1" }, () => [
              h(TabList, { "aria-label": "Inner" }, () => [
                h(Tab, { value: "o1" }, () => "I1"),
                h(Tab, { value: "o2" }, () => "I2"),
              ]),
              h(TabPanel, { value: "o1" }, () => "Inner one"),
              h(TabPanel, { value: "o2" }, () => "Inner two"),
            ]),
          ),
          h(TabPanel, { value: "o2" }, () => "Outer two"),
        ],
      },
    });
    expect(tab("O1").id).not.toBe(tab("I1").id);
    await user.click(tab("I1"));
    await user.keyboard("{ArrowRight}");
    expect(tab("I2")).toHaveFocus();
    expect(tab("I2")).toHaveAttribute("aria-selected", "true");
    expect(tab("O1")).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{End}{Home}");
    expect(tab("I1")).toHaveFocus();
    expect(tab("O1")).toHaveAttribute("aria-selected", "true");
    // Keys on a non-tab descendant of the list are ignored.
    const outer = screen.getByRole("tablist", { name: "Outer" });
    await fireEvent.keyDown(outer, { key: "ArrowRight" });
    expect(tab("O1")).toHaveAttribute("aria-selected", "true");
  });

  it("throws when a part is used outside Tabs", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(() => render(TabList)).toThrow(/inside <Tabs>/);
  });

  it("renders on the server with matching aria wiring", async () => {
    const html = await renderToString(
      createSSRApp({ render: () => h(Basic, { forceMount: true }) }),
    );
    const host = document.createElement("div");
    host.innerHTML = html;
    const tabs = host.querySelectorAll('[role="tab"]');
    const panels = host.querySelectorAll('[role="tabpanel"]');
    expect(tabs).toHaveLength(4);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(tabs[0]).toHaveAttribute("tabindex", "0");
    expect(tabs[1]).toHaveAttribute("tabindex", "-1");
    expect(tabs[0].getAttribute("aria-controls")).toBe(panels[0].id);
  });
});

describe("TabList reveal", () => {
  const rect = (left: number, right: number, top = 0, bottom = 0) =>
    ({
      left,
      right,
      top,
      bottom,
      width: right - left,
      height: bottom - top,
    }) as DOMRect;

  it("scrolls only the list to reveal the selected tab (horizontal and vertical)", async () => {
    const spy = vi
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockImplementation(function (this: HTMLElement) {
        if (this.getAttribute("role") === "tablist")
          return rect(0, 100, 0, 100);
        return this.getAttribute("data-state") === "active"
          ? rect(150, 200, 150, 200)
          : rect(0, 50, 0, 50);
      });
    const { unmount } = render(Basic, {
      props: { tabs: { defaultValue: "d" } },
    });
    await nextTick();
    expect(screen.getByRole("tablist").scrollLeft).toBe(100);
    unmount();
    render(Basic, {
      props: { tabs: { defaultValue: "d", orientation: "vertical" } },
    });
    await nextTick();
    expect(screen.getByRole("tablist").scrollTop).toBe(100);
    spy.mockImplementation(function (this: HTMLElement) {
      if (this.getAttribute("role") === "tablist") return rect(0, 100, 50, 100);
      return rect(-50, 0, 0, 20);
    });
    await fireEvent.click(tab("A"), { detail: 0 });
    await new Promise((r) => setTimeout(r, 0));
    spy.mockRestore();
  });

  it("covers the before-start branches and works without ResizeObserver", async () => {
    const original = globalThis.ResizeObserver;
    // @ts-expect-error simulate a runtime without ResizeObserver
    delete globalThis.ResizeObserver;
    const spy = vi
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockImplementation(function (this: HTMLElement) {
        if (this.getAttribute("role") === "tablist")
          return rect(100, 200, 100, 200);
        return rect(50, 80, 50, 80);
      });
    const { unmount } = render(Basic, {
      props: { tabs: { orientation: "horizontal" } },
    });
    await nextTick();
    unmount();
    render(Basic, { props: { tabs: { orientation: "vertical" } } });
    await nextTick();
    spy.mockImplementation(function (this: HTMLElement) {
      if (this.getAttribute("role") === "tablist") return rect(0, 100, 0, 100);
      return rect(10, 20, 10, 20);
    });
    await fireEvent.click(tab("B"), { detail: 0 });
    await new Promise((r) => setTimeout(r, 0));
    spy.mockRestore();
    globalThis.ResizeObserver = original;
    // A list without a selected tab is ignored.
    render(Tabs, {
      slots: {
        default: () =>
          h(TabList, null, () => h(Tab, { value: "x" }, () => "X")),
      },
    });
    await nextTick();
    expect(tab("X")).toHaveAttribute("tabindex", "0");
  });
});
