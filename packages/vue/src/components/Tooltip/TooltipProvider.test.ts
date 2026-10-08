// Tooltip asChild triggers, TooltipProvider delays, content class / ref,
// colors / variants, followCursor and keyboard use inside a Modal.
import { afterEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, nextTick, ref, type VNode } from "vue";
import { Tooltip, TooltipProvider } from ".";
import type { TooltipProps, TooltipVariant } from ".";
import { Modal } from "../Modal";
import { Button } from "../Button";

const render = (fn: () => VNode | VNode[]) =>
  mount(defineComponent({ setup: () => () => h("div", fn()) }), {
    attachTo: document.body,
  });
const tick = async () => {
  await flushPromises();
  await nextTick();
};
const settle = async () => {
  await tick();
  await new Promise((r) => setTimeout(r, 0));
  await tick();
};
const advance = async (ms: number) => {
  vi.advanceTimersByTime(ms);
  await tick();
};
const button = (name: string) =>
  [...document.querySelectorAll<HTMLElement>("button")].find(
    (b) => b.textContent?.trim() === name,
  )!;
const tooltip = () => document.querySelector<HTMLElement>('[role="tooltip"]');
const contentEl = () => document.querySelector<HTMLElement>(".tooltip");
const fire = (el: Element, type: string, init: MouseEventInit = {}) =>
  el.dispatchEvent(new MouseEvent(type, { bubbles: true, ...init }));

describe("Tooltip asChild and TooltipProvider", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("does not render the tooltip until the asChild trigger is focused", async () => {
    const user = userEvent.setup();
    const wrapper = render(() =>
      h(Tooltip, { content: "Save draft", asChild: true }, () =>
        h("button", { type: "button" }, "Save"),
      ),
    );
    const trigger = button("Save");
    // no wrapper element
    expect(wrapper.element.firstElementChild).toBe(trigger);
    expect(trigger.getAttribute("aria-describedby")).toBeNull();
    expect(trigger.getAttribute("data-minerva")).toBeNull();
    expect(tooltip()).toBeNull();

    await user.tab();
    await tick();
    expect(document.activeElement).toBe(trigger);
    expect(tooltip()!.textContent).toBe("Save draft");
    expect(trigger.getAttribute("aria-describedby")).toBe(tooltip()!.id);
  });

  it("closes on Escape and on blur", async () => {
    const user = userEvent.setup();
    render(() => [
      h(Tooltip, { content: "Hint", asChild: true }, () =>
        h("button", { type: "button" }, "Trigger"),
      ),
      h("button", { type: "button" }, "Next"),
    ]);
    await user.tab();
    await tick();
    expect(tooltip()).not.toBeNull();
    await user.keyboard("{Escape}");
    await tick();
    expect(tooltip()).toBeNull();

    await user.tab();
    await user.tab({ shift: true });
    await tick();
    expect(tooltip()).not.toBeNull();
    await user.tab();
    await tick();
    expect(tooltip()).toBeNull();
  });

  it("opens on hover only after the configured delay", async () => {
    vi.useFakeTimers();
    render(() =>
      h(Tooltip, { content: "Delayed", enterDelay: 500, asChild: true }, () =>
        h("button", { type: "button" }, "Hover me"),
      ),
    );
    fire(button("Hover me"), "mouseenter");
    await advance(499);
    expect(tooltip()).toBeNull();
    await advance(1);
    expect(tooltip()!.textContent).toBe("Delayed");
  });

  it("applies the placement, content class, arrow and the content ref", async () => {
    const user = userEvent.setup();
    const contentRef = ref<HTMLDivElement | null>(null);
    const callback = vi.fn();
    const instance = ref<{ contentElement: HTMLElement | null } | null>(null);
    render(() => [
      h(
        Tooltip,
        {
          ref: instance,
          contentRef,
          content: "L",
          placement: "bottom-start",
          arrow: true,
          variant: "glass",
          contentClassName: "extra",
          asChild: true,
        },
        () => h("button", { type: "button" }, "T"),
      ),
      h(
        Tooltip,
        { contentRef: callback, content: "M", defaultOpen: true },
        () => h("button", { type: "button" }, "U"),
      ),
    ]);
    await user.tab();
    await settle();
    const content = contentEl()!;
    expect(contentRef.value).toBe(content);
    expect(instance.value!.contentElement).toBe(content);
    expect(callback).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    for (const name of ["tooltip", "glass", "arrow", "extra"]) {
      expect(content.classList.contains(name)).toBe(true);
    }
    expect(content.getAttribute("data-placement")).toBe("bottom-start");
    expect(content.getAttribute("data-align")).toBe("start");
    expect(content.querySelector(".tooltipArrow")).not.toBeNull();
  });

  it.each<TooltipVariant>(["solid", "subtle", "glass"])(
    "applies the %s variant class",
    async (variant) => {
      render(() =>
        h(Tooltip, { content: "L", variant, defaultOpen: true }, () =>
          h("button", { type: "button" }, "T"),
        ),
      );
      await tick();
      expect(contentEl()!.classList.contains(variant)).toBe(true);
      expect(contentEl()!.classList.contains("neutral")).toBe(true);
    },
  );

  it.each<NonNullable<TooltipProps["color"]>>([
    "neutral",
    "info",
    "success",
    "warning",
    "danger",
  ])("applies the %s color class", async (color) => {
    render(() =>
      h(Tooltip, { content: "L", color, defaultOpen: true }, () =>
        h("button", { type: "button" }, "T"),
      ),
    );
    await tick();
    expect(contentEl()!.classList.contains(color)).toBe(true);
    expect(contentEl()!.classList.contains("solid")).toBe(true);
  });

  it("renders only the child when disabled with asChild and never opens", async () => {
    const user = userEvent.setup();
    const wrapper = render(() =>
      h(Tooltip, { content: "Never", disabled: true, asChild: true }, () =>
        h("button", { type: "button" }, "Plain"),
      ),
    );
    const trigger = button("Plain");
    expect(wrapper.element.firstElementChild).toBe(trigger);
    await user.tab();
    await user.hover(trigger);
    await tick();
    expect(document.activeElement).toBe(trigger);
    expect(tooltip()).toBeNull();
    expect(trigger.getAttribute("aria-describedby")).toBeNull();
  });

  it("keeps the child's own handlers, ref and class with asChild", async () => {
    const user = userEvent.setup();
    const onFocus = vi.fn();
    const onMouseenter = vi.fn();
    const onAttrFocusin = vi.fn();
    const child = ref<HTMLButtonElement | null>(null);
    render(() =>
      h(
        Tooltip,
        {
          content: "Hi",
          asChild: true,
          className: "from-tooltip",
          onFocusin: onAttrFocusin,
        },
        () =>
          h(
            "button",
            { ref: child, type: "button", class: "own", onFocus, onMouseenter },
            "Child",
          ),
      ),
    );
    const trigger = button("Child");
    expect(child.value).toBe(trigger);
    expect(trigger.classList.contains("own")).toBe(true);
    expect(trigger.classList.contains("from-tooltip")).toBe(true);
    await user.hover(trigger);
    await user.tab();
    await tick();
    expect(onMouseenter).toHaveBeenCalled();
    expect(onFocus).toHaveBeenCalled();
    expect(onAttrFocusin).toHaveBeenCalled();
    expect(tooltip()!.textContent).toBe("Hi");
  });

  it("works with a component child (asChild Button)", async () => {
    const user = userEvent.setup();
    render(() =>
      h(Tooltip, { content: "Saves", asChild: true }, () =>
        h(Button, null, () => "Save"),
      ),
    );
    await user.tab();
    await tick();
    expect(button("Save").getAttribute("aria-describedby")).toBe(tooltip()!.id);
  });

  it("falls back to the wrapper when asChild gets a non-element child", async () => {
    const wrapper = render(() =>
      h(Tooltip, { content: "Hi", asChild: true, defaultOpen: true }, () => [
        "text",
      ]),
    );
    await tick();
    expect(
      wrapper.element.firstElementChild!.classList.contains("tooltipTrigger"),
    ).toBe(true);
  });

  it("lets a TooltipProvider set the default delays", async () => {
    vi.useFakeTimers();
    render(() =>
      h(TooltipProvider, { enterDelay: 50, leaveDelay: 40 }, () =>
        h(Tooltip, { content: "Inside provider", asChild: true }, () =>
          h("button", { type: "button" }, "P"),
        ),
      ),
    );
    const trigger = button("P");
    fire(trigger, "mouseenter");
    await advance(49);
    expect(tooltip()).toBeNull();
    await advance(1);
    expect(tooltip()!.textContent).toBe("Inside provider");
    fire(trigger, "mouseleave");
    await advance(39);
    expect(tooltip()).not.toBeNull();
    await advance(1);
    expect(tooltip()).toBeNull();
  });

  it("an explicit enterDelay wins over the provider", async () => {
    vi.useFakeTimers();
    render(() =>
      h(TooltipProvider, { enterDelay: 1000 }, () =>
        h(Tooltip, { content: "Own", enterDelay: 10 }, () =>
          h("button", { type: "button" }, "P"),
        ),
      ),
    );
    fire(button("P"), "mouseenter");
    await advance(10);
    expect(tooltip()!.textContent).toBe("Own");
  });

  it("skips the delay when moving quickly between tooltips of a provider", async () => {
    vi.useFakeTimers();
    render(() =>
      h(TooltipProvider, { enterDelay: 300, skipDelay: 200 }, () => [
        h(Tooltip, { content: "First", asChild: true }, () =>
          h("button", { type: "button" }, "A"),
        ),
        h(Tooltip, { content: "Second", asChild: true }, () =>
          h("button", { type: "button" }, "B"),
        ),
      ]),
    );
    const a = button("A");
    const b = button("B");
    fire(a, "mouseenter");
    await advance(300);
    expect(tooltip()!.textContent).toBe("First");
    fire(a, "mouseleave");
    await advance(1);
    expect(tooltip()).toBeNull();
    fire(b, "mouseenter");
    await tick();
    expect(tooltip()!.textContent).toBe("Second");
    fire(b, "mouseleave");
    await advance(500);
    fire(a, "mouseenter");
    await tick();
    expect(tooltip()).toBeNull();
  });

  it("opens immediately with enterDelay 0", async () => {
    render(() =>
      h(Tooltip, { content: "Now", enterDelay: 0 }, () =>
        h("button", { type: "button" }, "N"),
      ),
    );
    fire(button("N"), "mouseenter");
    await tick();
    expect(tooltip()!.textContent).toBe("Now");
  });

  it("works standalone (focus)", async () => {
    render(() =>
      h(Tooltip, { content: "Standalone", enterDelay: 0, asChild: true }, () =>
        h("button", { type: "button" }, "S"),
      ),
    );
    button("S").focus();
    await tick();
    expect(tooltip()!.textContent).toBe("Standalone");
  });
});

describe("Tooltip followCursor", () => {
  it("anchors to the pointer and follows mouse moves while open", async () => {
    render(() =>
      h(Tooltip, { content: "Follow", followCursor: true, enterDelay: 0 }, () =>
        h("button", { type: "button" }, "F"),
      ),
    );
    fire(button("F"), "mouseenter", { clientX: 10, clientY: 20 });
    await tick();
    const tip = tooltip()!;
    expect(tip.classList.contains("followCursor")).toBe(true);
    fire(document.body, "mousemove", { clientX: 40, clientY: 50 });
    await settle();
    for (let i = 0; i < 10 && !tip.classList.contains("show"); i++) {
      await settle();
    }
    expect(tip.classList.contains("show")).toBe(true);
    // leaving the tooltip itself does not hide it
    fire(tip, "mouseleave");
    await settle();
    expect(tooltip()).not.toBeNull();
    // leaving the trigger hides it (no hover grace while following)
    fire(button("F"), "mouseleave", { clientX: 40, clientY: 50 });
    await settle();
    expect(tooltip()).toBeNull();
  });
});

describe("Tooltip keyboard inside a Modal", () => {
  it("Escape hides only the tooltip; a second Escape closes the Modal", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(() =>
      h(Modal, { open: true, title: "Settings", onOpenChange }, () => [
        h("input", { "aria-label": "Name" }),
        h(Tooltip, { content: "Saves the draft" }, () =>
          h("button", { type: "button" }, "Save"),
        ),
      ]),
    );
    await settle();
    const name = document.querySelector('input[aria-label="Name"]');
    expect(document.activeElement).toBe(name);
    await user.tab();
    await tick();
    const save = button("Save");
    expect(document.activeElement).toBe(save);
    const tip = tooltip()!;
    expect(save.getAttribute("aria-describedby")).toContain(tip.id);

    await user.keyboard("{Escape}");
    await tick();
    expect(tooltip()).toBeNull();
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(save);
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();

    await user.keyboard("{Escape}");
    await tick();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("hides on blur when Tab moves on inside the Modal", async () => {
    const user = userEvent.setup();
    render(() =>
      h(Modal, { open: true, title: "Settings" }, () => [
        h(Tooltip, { content: "Saves the draft" }, () =>
          h("button", { type: "button" }, "Save"),
        ),
        h("input", { "aria-label": "Name" }),
      ]),
    );
    await settle();
    expect(document.activeElement).toBe(button("Save"));
    expect(tooltip()).not.toBeNull();
    await user.tab();
    await tick();
    expect(document.activeElement).toBe(
      document.querySelector('input[aria-label="Name"]'),
    );
    expect(tooltip()).toBeNull();
  });
});
