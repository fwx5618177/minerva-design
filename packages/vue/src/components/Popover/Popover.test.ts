import { describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, nextTick, ref, type VNode } from "vue";
import { isScrollLocked } from "@minerva/dom";
import {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from ".";
import { Modal } from "../Modal";

const setup = () => userEvent.setup({ pointerEventsCheck: 0 });

const settle = async () => {
  await flushPromises();
  await new Promise((r) => setTimeout(r, 0));
  await nextTick();
};

const until = async (check: () => boolean, tries = 20) => {
  for (let i = 0; i < tries && !check(); i += 1) await settle();
  expect(check()).toBe(true);
};

const render = (fn: () => VNode | VNode[]) =>
  mount(defineComponent({ setup: () => () => h("div", fn()) }), {
    attachTo: document.body,
  });

const button = (name: string) =>
  [...document.querySelectorAll<HTMLElement>("button")].find(
    (b) => b.textContent?.trim() === name,
  )!;
const dialog = () => document.querySelector<HTMLElement>('[role="dialog"]');

const basic = (
  rootProps: Record<string, unknown> = {},
  contentProps: Record<string, unknown> = {},
) =>
  h(Popover, rootProps, () => [
    h(PopoverTrigger, null, () => "Filter"),
    h(
      PopoverContent,
      { "aria-label": "Filters", class: "extra", ...contentProps },
      () => [
        h("label", null, ["Read ", h("input", { type: "checkbox" })]),
        h(PopoverClose, null, () => "Close"),
      ],
    ),
  ]);

describe("Popover", () => {
  it("is closed by default and opens on trigger click", async () => {
    const user = setup();
    render(() => basic());
    const trigger = button("Filter");
    expect(trigger.getAttribute("type")).toBe("button");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
    expect(trigger.getAttribute("data-state")).toBe("closed");
    expect(trigger.getAttribute("aria-controls")).toBeNull();
    expect(dialog()).toBeNull();

    await user.click(trigger);
    await settle();
    const content = dialog()!;
    expect(content.getAttribute("aria-label")).toBe("Filters");
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(trigger.getAttribute("aria-controls")).toBe(content.id);
    expect(trigger.getAttribute("data-state")).toBe("open");
    expect(content.classList.contains("content")).toBe(true);
    expect(content.classList.contains("extra")).toBe(true);
    expect(content.getAttribute("data-side")).toBe("bottom");
    expect(content.getAttribute("data-state")).toBe("open");
    expect(content.getAttribute("aria-modal")).toBeNull();
    expect(content.querySelector(".arrow")).toBeNull();
    // teleported to the body
    expect(content.parentElement!.parentElement).toBe(document.body);
  });

  it("moves focus into the content, closes on Escape and returns focus to the trigger", async () => {
    const user = setup();
    const wrapper = mount(Popover, {
      attachTo: document.body,
      slots: {
        default: () => [
          h(PopoverTrigger, null, () => "Filter"),
          h(PopoverContent, null, () => h("input", { "aria-label": "Q" })),
        ],
      },
    });
    const trigger = button("Filter");
    await user.click(trigger);
    await settle();
    expect(dialog()!.contains(document.activeElement)).toBe(true);
    await user.keyboard("{Escape}");
    await settle();
    expect(dialog()).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(wrapper.emitted("openChange")).toEqual([[true], [false]]);
    expect(wrapper.emitted("update:open")).toEqual([[true], [false]]);
  });

  it("closes via PopoverClose and by clicking outside", async () => {
    const user = setup();
    render(() => [h("button", { type: "button" }, "Elsewhere"), basic()]);
    await user.click(button("Filter"));
    await settle();
    await user.click(button("Close"));
    await settle();
    expect(dialog()).toBeNull();

    await user.click(button("Filter"));
    await settle();
    expect(dialog()).not.toBeNull();
    await user.click(button("Elsewhere"));
    await settle();
    expect(dialog()).toBeNull();
  });

  it("toggles closed when the trigger is clicked again and opens via keyboard", async () => {
    const user = setup();
    render(() => basic());
    const trigger = button("Filter");
    await user.click(trigger);
    await settle();
    await user.click(trigger);
    await settle();
    expect(dialog()).toBeNull();
    trigger.focus();
    await user.keyboard("{Enter}");
    await settle();
    expect(dialog()).not.toBeNull();
  });

  it("supports a controlled open state (v-model:open)", async () => {
    const user = setup();
    const open = ref(false);
    const onOpenChange = vi.fn();
    render(() => basic({ open: open.value, onOpenChange }));
    await user.click(button("Filter"));
    await settle();
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(dialog()).toBeNull();

    open.value = true;
    await settle();
    expect(dialog()).not.toBeNull();
    await user.keyboard("{Escape}");
    await settle();
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(dialog()).not.toBeNull();
  });

  it("two-way binds v-model:open", async () => {
    const user = setup();
    const open = ref(true);
    render(() =>
      basic({
        open: open.value,
        "onUpdate:open": (value: boolean) => (open.value = value),
      }),
    );
    await settle();
    expect(dialog()).not.toBeNull();
    await user.click(button("Close"));
    await settle();
    expect(open.value).toBe(false);
    expect(dialog()).toBeNull();
  });

  it("renders an arrow, passes attributes through and exposes the panel element", async () => {
    const content = ref<{ element: HTMLElement | null } | null>(null);
    render(() =>
      h(Popover, { open: true }, () => [
        h(PopoverAnchor, null, () => h("span", "anchor")),
        h(PopoverTrigger, null, () => "T"),
        h(
          PopoverContent,
          { ref: content, arrow: true, "data-k": "v" },
          () => "body",
        ),
      ]),
    );
    await settle();
    const panel = dialog()!;
    expect(content.value?.element).toBe(panel);
    expect(panel.getAttribute("data-k")).toBe("v");
    expect(panel.querySelector("svg")!.classList.contains("arrow")).toBe(true);
    const arrow = panel.querySelector('[data-part="arrow"]')!;
    expect(arrow.getAttribute("data-minerva")).toBe("popover");
    expect(arrow.getAttribute("aria-hidden")).toBe("true");
  });

  it("opens initially with defaultOpen and passes side / align through", async () => {
    render(() =>
      h(Popover, { defaultOpen: true }, () => [
        h(PopoverTrigger, null, () => "T"),
        h(
          PopoverContent,
          { side: "top", align: "end", "aria-label": "Menu" },
          () => "body",
        ),
      ]),
    );
    await settle();
    const content = dialog()!;
    expect(content.getAttribute("data-side")).toBe("top");
    expect(content.getAttribute("data-align")).toBe("end");
    expect(content.getAttribute("data-placement")).toBe("top-end");
    expect(content.parentElement!.getAttribute("data-side")).toBe("top");
  });

  it("renders inline without a portal when portal is false (asChild trigger)", async () => {
    const wrapper = render(() =>
      h(Popover, { open: true }, () => [
        h(PopoverTrigger, { asChild: true }, () =>
          h("button", { type: "button", class: "own" }, "T"),
        ),
        h(
          PopoverContent,
          { portal: false, "aria-label": "Inline" },
          () => "body",
        ),
      ]),
    );
    await settle();
    expect(wrapper.element.contains(dialog())).toBe(true);
    const trigger = button("T");
    // asChild: the child keeps its own hooks (none) but gets the aria
    expect(trigger.getAttribute("data-minerva")).toBeNull();
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
    expect(trigger.classList.contains("own")).toBe(true);
  });

  it("toggles from an asChild trigger and an asChild close, and lets preventDefault cancel", async () => {
    const user = setup();
    let cancel = true;
    render(() =>
      h(Popover, null, () => [
        h(
          PopoverTrigger,
          {
            asChild: true,
            onClick: (event: MouseEvent) => {
              if (cancel) event.preventDefault();
            },
          },
          () => h("button", { type: "button" }, "T"),
        ),
        h(PopoverContent, null, () =>
          h(PopoverClose, { asChild: true }, () =>
            h("button", { type: "button" }, "X"),
          ),
        ),
      ]),
    );
    await user.click(button("T"));
    await settle();
    expect(dialog()).toBeNull();
    cancel = false;
    await user.click(button("T"));
    await settle();
    expect(dialog()).not.toBeNull();
    expect(button("T").getAttribute("aria-expanded")).toBe("true");
    await user.click(button("X"));
    await settle();
    expect(dialog()).toBeNull();
  });

  it("traps focus in modal mode", async () => {
    const user = setup();
    render(() => [
      h("button", { type: "button" }, "Outside"),
      h(Popover, { modal: true, defaultOpen: true }, () => [
        h(PopoverTrigger, null, () => "T"),
        h(PopoverContent, { "aria-label": "Modal popover" }, () => [
          h("button", { type: "button" }, "One"),
          h("button", { type: "button" }, "Two"),
        ]),
      ]),
    ]);
    await settle();
    const content = dialog()!;
    for (let i = 0; i < 3; i += 1) {
      await user.tab();
      expect(content.contains(document.activeElement)).toBe(true);
    }
  });

  it("modal mode hides the page, locks scrolling, and still closes on an outside click", async () => {
    const user = setup();
    render(() => [
      h("main", "page"),
      h(Popover, { modal: true }, () => [
        h(PopoverTrigger, null, () => "Open"),
        h(PopoverContent, { "aria-label": "Modal panel" }, () =>
          h("button", { type: "button" }, "Inside"),
        ),
      ]),
    ]);
    await user.click(button("Open"));
    await settle();
    const content = dialog()!;
    const page = document.querySelector("main")!;
    expect(content.getAttribute("aria-modal")).toBe("true");
    expect(page.closest('[aria-hidden="true"]')).not.toBeNull();
    expect(isScrollLocked()).toBe(true);
    expect(document.body.style.pointerEvents).toBe("none");
    await user.click(page);
    await settle();
    expect(dialog()).toBeNull();
    expect(page.closest("[aria-hidden]")).toBeNull();
    expect(isScrollLocked()).toBe(false);
    expect(document.body.style.pointerEvents).toBe("");
  });

  it("closes when focus leaves a non-modal popover", async () => {
    const user = setup();
    render(() => [basic(), h("input", { "aria-label": "Search" })]);
    await user.click(button("Filter"));
    await settle();
    expect(dialog()).not.toBeNull();
    const search = document.querySelector<HTMLInputElement>(
      'input[aria-label="Search"]',
    )!;
    search.focus();
    await settle();
    expect(dialog()).toBeNull();
    expect(document.activeElement).toBe(search);
  });

  it("lets handlers keep it open and cancel the auto focus", async () => {
    const user = setup();
    const onEscapeKeyDown = vi.fn((event: KeyboardEvent) =>
      event.preventDefault(),
    );
    const onPointerDownOutside = vi.fn((event: PointerEvent) =>
      event.preventDefault(),
    );
    const onFocusOutside = vi.fn((event: FocusEvent) => event.preventDefault());
    const onInteractOutside = vi.fn();
    const onOpenAutoFocus = vi.fn((event: Event) => event.preventDefault());
    render(() => [
      h("button", { type: "button" }, "Elsewhere"),
      h(Popover, null, () => [
        h(PopoverTrigger, null, () => "Open"),
        h(
          PopoverContent,
          {
            "aria-label": "Sticky",
            onEscapeKeyDown,
            onPointerDownOutside,
            onFocusOutside,
            onInteractOutside,
            onOpenAutoFocus,
          },
          () => h("button", { type: "button" }, "Inside"),
        ),
      ]),
    ]);
    const trigger = button("Open");
    await user.click(trigger);
    await settle();
    expect(onOpenAutoFocus).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(trigger);
    await user.keyboard("{Escape}");
    await user.click(button("Elsewhere"));
    await settle();
    expect(onEscapeKeyDown).toHaveBeenCalledTimes(1);
    expect(onPointerDownOutside).toHaveBeenCalledTimes(1);
    expect(onInteractOutside).toHaveBeenCalled();
    expect(dialog()).not.toBeNull();
  });

  it("emits closeAutoFocus before returning focus to the trigger", async () => {
    const user = setup();
    const onCloseAutoFocus = vi.fn((event: Event) => event.preventDefault());
    render(() =>
      h(Popover, null, () => [
        h(PopoverTrigger, null, () => "Open"),
        h(PopoverContent, { onCloseAutoFocus }, () =>
          h(PopoverClose, null, () => "Close"),
        ),
      ]),
    );
    await user.click(button("Open"));
    await settle();
    expect(document.activeElement).toBe(button("Close"));
    await user.click(button("Close"));
    await settle();
    expect(onCloseAutoFocus).toHaveBeenCalledTimes(1);
    expect(document.activeElement).not.toBe(button("Open"));
  });

  it("anchors to PopoverAnchor, sizes after it and positions the arrow", async () => {
    render(() =>
      h(Popover, { open: true }, () => [
        h(PopoverAnchor, { "data-testid": "anchor" }, () => "field"),
        h(PopoverTrigger, null, () => "T"),
        h(
          PopoverContent,
          {
            "aria-label": "Anchored",
            matchAnchorWidth: "min",
            side: "right",
            arrow: true,
          },
          () => "body",
        ),
      ]),
    );
    await settle();
    const content = dialog()!;
    const positioner = content.parentElement!;
    expect(positioner.classList.contains("positioner")).toBe(true);
    expect(positioner.style.position).toBe("fixed");
    // off-screen until the first position is computed, then placed
    await until(() => positioner.style.transform === "");
    expect(positioner.style.minWidth).toBe("0px");
    expect(content.getAttribute("data-side")).toBe("right");
    expect(
      content.querySelector(".arrowWrapper")!.getAttribute("aria-hidden"),
    ).toBe("true");
    expect(
      document.querySelector('[data-testid="anchor"]')!.tagName.toLowerCase(),
    ).toBe("div");
  });

  it("anchors to an asChild PopoverAnchor", async () => {
    render(() =>
      h(Popover, { open: true }, () => [
        h(PopoverAnchor, { asChild: true }, () =>
          h("input", { "aria-label": "Field" }),
        ),
        h(PopoverContent, null, () => "body"),
      ]),
    );
    await settle();
    const content = dialog()!;
    await until(() => content.parentElement!.style.transform === "");
  });

  it("keeps a forceMount-ed panel mounted while closed", async () => {
    const user = setup();
    render(() =>
      h(Popover, null, () => [
        h(PopoverTrigger, null, () => "T"),
        h(
          PopoverContent,
          { forceMount: true, "aria-label": "Kept" },
          () => "body",
        ),
      ]),
    );
    await settle();
    const content = dialog()!;
    expect(content.getAttribute("data-state")).toBe("closed");
    await user.click(button("T"));
    await settle();
    expect(content.getAttribute("data-state")).toBe("open");
    expect(button("T").getAttribute("data-state")).toBe("open");
  });

  it("stays mounted during the exit animation", async () => {
    const user = setup();
    const getComputedStyle = window.getComputedStyle.bind(window);
    vi.spyOn(window, "getComputedStyle").mockImplementation((el, pseudo) => {
      const style = getComputedStyle(el, pseudo);
      if (!el.matches('[role="dialog"]')) return style;
      return new Proxy(style, {
        get: (target, key) =>
          key === "animationDuration"
            ? "0.05s"
            : key === "animationName"
              ? "fade"
              : Reflect.get(target, key, target),
      });
    });
    render(() => basic({ defaultOpen: true }));
    await settle();
    await user.click(button("Filter"));
    await settle();
    expect(dialog()?.getAttribute("data-state")).toBe("closed");
    dialog()!.dispatchEvent(new Event("animationend"));
    await until(() => dialog() === null, 40);
    vi.restoreAllMocks();
  });

  it("requires the Popover root", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(() => mount(PopoverClose, { attachTo: document.body })).toThrow(
      /inside <Popover>/,
    );
    vi.restoreAllMocks();
  });

  it("is a child layer: Escape closes the nested popover first", async () => {
    const user = setup();
    const outer = vi.fn();
    const inner = vi.fn();
    render(() =>
      h(Popover, { onOpenChange: outer }, () => [
        h(PopoverTrigger, null, () => "Outer"),
        h(PopoverContent, { "aria-label": "Outer panel" }, () =>
          h(Popover, { onOpenChange: inner }, () => [
            h(PopoverTrigger, null, () => "Inner"),
            h(PopoverContent, { "aria-label": "Inner panel" }, () =>
              h("button", { type: "button" }, "Deep"),
            ),
          ]),
        ),
      ]),
    );
    await user.click(button("Outer"));
    await settle();
    await user.click(button("Inner"));
    await settle();
    expect(document.querySelectorAll('[role="dialog"]')).toHaveLength(2);
    // a click inside the inner panel does not close the outer one
    await user.click(button("Deep"));
    await settle();
    expect(document.querySelectorAll('[role="dialog"]')).toHaveLength(2);
    await user.keyboard("{Escape}");
    await settle();
    expect(inner).toHaveBeenLastCalledWith(false);
    expect(outer).not.toHaveBeenCalledWith(false);
    expect(document.querySelectorAll('[role="dialog"]')).toHaveLength(1);
    await user.keyboard("{Escape}");
    await settle();
    expect(outer).toHaveBeenLastCalledWith(false);
    expect(dialog()).toBeNull();
  });

  it("inside a Modal: Escape closes the popover only, Tab moves on inside the Modal", async () => {
    const user = setup();
    const onModal = vi.fn();
    render(() =>
      h(Modal, { open: true, title: "Settings", onOpenChange: onModal }, () => [
        h(Popover, null, () => [
          h(PopoverTrigger, null, () => "Sort"),
          h(PopoverContent, { "aria-label": "Sort options" }, () =>
            h("button", { type: "button" }, "Newest"),
          ),
        ]),
        h("button", { type: "button" }, "Next"),
      ]),
    );
    await settle();
    await user.click(button("Sort"));
    await settle();
    expect(document.activeElement).toBe(button("Newest"));
    await user.keyboard("{Escape}");
    await settle();
    expect(document.querySelector('[aria-label="Sort options"]')).toBeNull();
    expect(onModal).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(button("Sort"));

    await user.click(button("Sort"));
    await settle();
    await user.tab();
    await settle();
    expect(document.activeElement).toBe(button("Next"));
    expect(document.querySelector('[aria-label="Sort options"]')).toBeNull();
  });
});
