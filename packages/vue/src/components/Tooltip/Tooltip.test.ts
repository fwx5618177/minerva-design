import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, nextTick, ref, type VNode } from "vue";
import { Tooltip } from ".";
import type { TooltipRef } from ".";

const render = (fn: () => VNode | VNode[]) =>
  mount(defineComponent({ setup: () => () => h("div", fn()) }), {
    attachTo: document.body,
  });

const tick = async () => {
  await flushPromises();
  await nextTick();
};
const advance = async (ms: number) => {
  vi.advanceTimersByTime(ms);
  await tick();
};

const button = (name: string) =>
  [...document.querySelectorAll<HTMLElement>("button")].find(
    (b) => b.textContent?.trim() === name,
  )!;
const getTrigger = () => button("Trigger");
const tooltip = () => document.querySelector<HTMLElement>('[role="tooltip"]');
const trigger = (props: Record<string, unknown> = {}) =>
  h("button", { type: "button", ...props }, "Trigger");

const rect = (r: Partial<DOMRect>) =>
  ({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    toJSON: () => ({}),
    ...r,
  }) as DOMRect;

describe("Tooltip", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const setup = () =>
    userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

  it("keeps the child as the only interactive element", async () => {
    const wrapper = render(() =>
      h(Tooltip, { content: "Hello", "aria-label": "Tip" }, () => trigger()),
    );
    await tick();
    expect(document.querySelectorAll("button")).toHaveLength(1);
    const outer = wrapper.element.firstElementChild as HTMLElement;
    expect(outer.classList.contains("tooltipTrigger")).toBe(true);
    expect(outer.getAttribute("role")).toBeNull();
    expect(outer.getAttribute("tabindex")).toBeNull();
    expect(outer.getAttribute("aria-label")).toBeNull();
    expect(outer.getAttribute("data-minerva")).toBe("tooltip");
    expect(outer.getAttribute("data-state")).toBe("closed");
    expect(getTrigger().getAttribute("aria-describedby")).toBeNull();
    expect(tooltip()).toBeNull();
  });

  it("does not swallow Enter/Space so the wrapped button still activates", async () => {
    const user = setup();
    const onClick = vi.fn();
    const onKeydown = vi.fn((e: KeyboardEvent) => e.defaultPrevented);
    render(() =>
      h(Tooltip, { content: "Hello" }, () => trigger({ onClick, onKeydown })),
    );
    await user.tab();
    expect(document.activeElement).toBe(getTrigger());
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onKeydown.mock.results.every((r) => r.value === false)).toBe(true);
  });

  it("gives each instance a unique tooltip id referenced by aria-describedby", async () => {
    render(() => [
      h(Tooltip, { content: "First", defaultOpen: true }, () =>
        h("button", { type: "button" }, "One"),
      ),
      h(Tooltip, { content: "Second", defaultOpen: true }, () =>
        h("button", { type: "button" }, "Two"),
      ),
    ]);
    await tick();
    const [first, second] = document.querySelectorAll('[role="tooltip"]');
    expect(first.id).toBeTruthy();
    expect(first.id).not.toBe(second.id);
    expect(document.querySelectorAll(`#${first.id}`)).toHaveLength(1);
    expect(button("One").getAttribute("aria-describedby")).toBe(first.id);
    expect(button("Two").getAttribute("aria-describedby")).toBe(second.id);
    expect(first.textContent).toBe("First");
  });

  it("merges an existing aria-describedby on the child", async () => {
    render(() =>
      h(Tooltip, { content: "Hello", defaultOpen: true }, () =>
        trigger({ "aria-describedby": "hint" }),
      ),
    );
    await tick();
    expect(getTrigger().getAttribute("aria-describedby")).toBe(
      `hint ${tooltip()!.id}`,
    );
  });

  it("puts aria-describedby on the wrapper for non-element children", async () => {
    const wrapper = render(() =>
      h(Tooltip, { content: "Hello", defaultOpen: true }, () => "plain text"),
    );
    await tick();
    expect(
      wrapper.element.firstElementChild!.getAttribute("aria-describedby"),
    ).toBe(tooltip()!.id);
  });

  it("renders the content slot", async () => {
    render(() =>
      h(
        Tooltip,
        { defaultOpen: true },
        { default: () => trigger(), content: () => h("b", "Rich") },
      ),
    );
    await tick();
    expect(tooltip()!.querySelector("b")!.textContent).toBe("Rich");
  });

  it("shows after enterDelay on hover and hides on unhover", async () => {
    const user = setup();
    const onOpen = vi.fn();
    const onClose = vi.fn();
    render(() =>
      h(
        Tooltip,
        {
          content: "Hello",
          "aria-label": "Tip",
          enterDelay: 300,
          leaveDelay: 100,
          onOpen,
          onClose,
        },
        () => trigger(),
      ),
    );
    await user.hover(getTrigger());
    expect(tooltip()).toBeNull();
    await advance(300);
    expect(tooltip()!.textContent).toBe("Hello");
    expect(tooltip()!.getAttribute("aria-label")).toBe("Tip");
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(getTrigger().getAttribute("aria-describedby")).toBe(tooltip()!.id);

    await user.unhover(getTrigger());
    expect(tooltip()).not.toBeNull();
    await advance(100);
    expect(tooltip()).toBeNull();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("cancels opening if the pointer leaves before enterDelay", async () => {
    const user = setup();
    const onOpen = vi.fn();
    render(() => h(Tooltip, { content: "Hello", onOpen }, () => trigger()));
    await user.hover(getTrigger());
    await user.unhover(getTrigger());
    await advance(500);
    expect(tooltip()).toBeNull();
    expect(onOpen).not.toHaveBeenCalled();
  });

  it("adds the show class once positioned", async () => {
    render(() =>
      h(Tooltip, { content: "Hello", defaultOpen: true }, () => trigger()),
    );
    for (let i = 0; i < 10 && !tooltip()?.classList.contains("show"); i++) {
      await advance(20);
    }
    expect(tooltip()!.classList.contains("show")).toBe(true);
  });

  it("does not open when disabled", async () => {
    const user = setup();
    const onOpen = vi.fn();
    const wrapper = render(() =>
      h(Tooltip, { content: "Hello", disabled: true, onOpen }, () => trigger()),
    );
    await user.hover(getTrigger());
    await advance(1000);
    await user.unhover(getTrigger());
    await user.tab();
    expect(document.activeElement).toBe(getTrigger());
    await user.tab();
    expect(tooltip()).toBeNull();
    expect(onOpen).not.toHaveBeenCalled();
    expect(
      wrapper.element.firstElementChild!.getAttribute("data-disabled"),
    ).toBe("");
  });

  it("opens on keyboard focus, closes on Escape and on blur", async () => {
    const user = setup();
    const onOpen = vi.fn();
    const onClose = vi.fn();
    render(() =>
      h(Tooltip, { content: "Hello", onOpen, onClose }, () => trigger()),
    );
    await user.tab();
    await tick();
    expect(document.activeElement).toBe(getTrigger());
    expect(tooltip()).not.toBeNull();
    expect(onOpen).toHaveBeenCalledTimes(1);

    await user.keyboard("{Escape}");
    await tick();
    expect(tooltip()).toBeNull();
    expect(onClose).toHaveBeenCalledTimes(1);

    await user.tab({ shift: true });
    await user.tab();
    await tick();
    expect(tooltip()).not.toBeNull();
    expect(onOpen).toHaveBeenCalledTimes(2);

    await user.tab();
    await tick();
    expect(document.activeElement).not.toBe(getTrigger());
    expect(tooltip()).toBeNull();
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("ignores Escape when already closed", async () => {
    const user = setup();
    const onClose = vi.fn();
    render(() => h(Tooltip, { content: "Hello", onClose }, () => trigger()));
    await user.tab();
    await tick();
    await user.keyboard("{Escape}");
    await tick();
    expect(onClose).toHaveBeenCalledTimes(1);
    await user.keyboard("{Escape}");
    await tick();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("respects the controlled open prop and reports requested changes", async () => {
    const user = setup();
    const open = ref(false);
    const onOpenChange = vi.fn();
    render(() =>
      h(Tooltip, { content: "Hello", open: open.value, onOpenChange }, () =>
        trigger(),
      ),
    );
    await user.tab();
    await tick();
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(true);
    // still controlled: stays closed until the parent says otherwise
    expect(tooltip()).toBeNull();
    open.value = true;
    await tick();
    expect(tooltip()).not.toBeNull();
  });

  it("two-way binds v-model:open", async () => {
    const user = setup();
    const open = ref(false);
    render(() =>
      h(
        Tooltip,
        {
          content: "Hello",
          open: open.value,
          "onUpdate:open": (v: boolean) => (open.value = v),
        },
        () => trigger(),
      ),
    );
    await user.tab();
    await tick();
    expect(open.value).toBe(true);
    expect(tooltip()).not.toBeNull();
  });

  it("exposes open, close and toggle", async () => {
    const instance = ref<TooltipRef | null>(null);
    render(() =>
      h(Tooltip, { ref: instance, content: "Hello" }, () => trigger()),
    );
    instance.value!.open();
    await tick();
    expect(tooltip()).not.toBeNull();
    instance.value!.close();
    await tick();
    expect(tooltip()).toBeNull();
    instance.value!.toggle();
    await tick();
    expect(tooltip()).not.toBeNull();
    instance.value!.toggle();
    await tick();
    expect(tooltip()).toBeNull();
  });

  it("applies color, variant, shape, animation, arrow and style props", async () => {
    render(() =>
      h(
        Tooltip,
        {
          content: "Hello",
          defaultOpen: true,
          color: "success",
          variant: "subtle",
          shape: "rounded",
          animation: "scale",
          arrow: true,
          zIndex: 99,
          className: "custom-trigger",
          class: "attr-class",
        },
        () => trigger(),
      ),
    );
    await tick();
    const outer = getTrigger().parentElement!;
    expect(outer.classList.contains("tooltipTrigger")).toBe(true);
    expect(outer.classList.contains("custom-trigger")).toBe(true);
    expect(outer.classList.contains("attr-class")).toBe(true);
    expect(outer.getAttribute("data-state")).toBe("open");
    const tip = tooltip()!;
    for (const name of ["tooltip", "success", "subtle", "rounded", "arrow"]) {
      expect(tip.classList.contains(name)).toBe(true);
    }
    expect(tip.classList.contains("neutral")).toBe(false);
    expect(tip.classList.contains("animation-scale")).toBe(true);
    expect(tip.style.zIndex).toBe("99");
    expect(tip.getAttribute("data-color")).toBe("success");
    expect(tip.getAttribute("data-variant")).toBe("subtle");
    expect(tip.getAttribute("data-shape")).toBe("rounded");
    const arrowEl = tip.querySelector<HTMLElement>(".tooltipArrow")!;
    expect(arrowEl).not.toBeNull();
    expect(arrowEl.getAttribute("data-part")).toBe("arrow");
    expect(arrowEl.style.background).toBe("");
  });

  it("defaults to the neutral solid tooltip without an arrow", async () => {
    render(() =>
      h(Tooltip, { content: "Hello", defaultOpen: true }, () => trigger()),
    );
    await tick();
    const tip = tooltip()!;
    for (const name of ["tooltip", "neutral", "solid", "default"]) {
      expect(tip.classList.contains(name)).toBe(true);
    }
    expect(tip.getAttribute("data-placement")).toBe("top");
    expect(tip.getAttribute("data-side")).toBe("top");
    expect(tip.getAttribute("data-state")).toBe("open");
    expect(tip.querySelector(".tooltipArrow")).toBeNull();
  });

  describe("positioning", () => {
    const mockLayout = (triggerTop = 200) => {
      vi.spyOn(document.documentElement, "clientWidth", "get").mockReturnValue(
        1024,
      );
      vi.spyOn(document.documentElement, "clientHeight", "get").mockReturnValue(
        768,
      );
      vi.spyOn(
        HTMLElement.prototype,
        "getBoundingClientRect",
      ).mockImplementation(function (this: HTMLElement) {
        return this.classList.contains("tooltipTrigger")
          ? rect({
              x: 100,
              y: triggerTop,
              top: triggerTop,
              bottom: triggerTop + 20,
              left: 100,
              right: 160,
              width: 60,
              height: 20,
            })
          : rect({});
      });
      vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockImplementation(
        function (this: HTMLElement) {
          return this.getAttribute("role") === "tooltip" ? 30 : 0;
        },
      );
    };
    const settled = async (check: () => boolean) => {
      for (let i = 0; i < 20 && !check(); i++) await advance(20);
      expect(check()).toBe(true);
    };

    it("flips below the trigger when there is no room above", async () => {
      mockLayout(4);
      render(() =>
        h(Tooltip, { content: "Hello", defaultOpen: true }, () => trigger()),
      );
      await settled(
        () => tooltip()?.getAttribute("data-placement") === "bottom",
      );
      expect(tooltip()!.style.top).toBe("32px");
    });

    it("uses offset [x, y] as cross / main axis for top placements", async () => {
      mockLayout();
      render(() =>
        h(
          Tooltip,
          { content: "Hello", defaultOpen: true, offset: [12, 20] },
          () => trigger(),
        ),
      );
      // top: 200 - 30 (height) - 20 (y gap); left: 130 (trigger center) + 12
      await settled(() => tooltip()?.style.top === "150px");
      expect(tooltip()!.style.left).toBe("142px");
    });

    it("uses offset [x, y] as main / cross axis for right placements", async () => {
      mockLayout();
      render(() =>
        h(
          Tooltip,
          {
            content: "Hello",
            defaultOpen: true,
            placement: "right",
            offset: [16, 4],
          },
          () => trigger(),
        ),
      );
      await settled(() => tooltip()?.style.left === "176px");
      expect(tooltip()!.getAttribute("data-placement")).toBe("right");
      expect(tooltip()!.style.top).toBe("199px");
    });

    it("adds the arrow gap to the offset main axis", async () => {
      mockLayout();
      render(() =>
        h(
          Tooltip,
          { content: "Hello", defaultOpen: true, offset: [0, 20], arrow: true },
          () => trigger(),
        ),
      );
      await settled(() => tooltip()?.style.top === "144px");
      expect(tooltip()!.style.left).toBe("130px");
    });
  });

  it("dismisses with Escape even when opened by hover (focus elsewhere)", async () => {
    const user = setup();
    render(() =>
      h(Tooltip, { content: "Hello", enterDelay: 0 }, () => trigger()),
    );
    await user.hover(getTrigger());
    await advance(10);
    expect(tooltip()).not.toBeNull();
    await user.keyboard("{Escape}");
    await tick();
    expect(tooltip()).toBeNull();
  });

  describe("hoverable (WCAG 1.4.13)", () => {
    // Trigger 60x20 at (100, 200); the tooltip (placement top) 60x20 at
    // (100, 150): a 30px gap between them.
    const mockHoverLayout = () => {
      vi.spyOn(
        HTMLElement.prototype,
        "getBoundingClientRect",
      ).mockImplementation(function (this: HTMLElement) {
        if (this.classList.contains("tooltipTrigger")) {
          return rect({
            x: 100,
            y: 200,
            top: 200,
            bottom: 220,
            left: 100,
            right: 160,
            width: 60,
            height: 20,
          });
        }
        if (this.getAttribute("role") === "tooltip") {
          return rect({
            x: 100,
            y: 150,
            top: 150,
            bottom: 170,
            left: 100,
            right: 160,
            width: 60,
            height: 20,
          });
        }
        return rect({});
      });
    };

    const openByHover = async () => {
      const user = setup();
      render(() =>
        h(Tooltip, { content: "Hello", enterDelay: 0 }, () => trigger()),
      );
      await user.hover(getTrigger());
      await advance(10);
      return tooltip()!;
    };
    const mouse = (
      el: EventTarget,
      type: string,
      init: MouseEventInit = {},
    ) => {
      const Ctor = type.startsWith("pointer") ? PointerEvent : MouseEvent;
      el.dispatchEvent(new Ctor(type, { bubbles: true, ...init }));
    };

    it("stays open while the pointer crosses the gap onto the tooltip", async () => {
      mockHoverLayout();
      const tip = await openByHover();
      const wrapper = getTrigger().parentElement!;
      mouse(wrapper, "mouseleave", { clientX: 130, clientY: 200 });
      mouse(document.body, "pointermove", { clientX: 130, clientY: 185 });
      // moving over the trigger / tooltip themselves is ignored
      mouse(tip, "pointermove", { clientX: 130, clientY: 160 });
      await advance(100);
      expect(tooltip()).not.toBeNull();

      mouse(tip, "mouseenter");
      await advance(1000);
      expect(tooltip()).not.toBeNull();

      mouse(tip, "mouseleave");
      await advance(0);
      expect(tooltip()).toBeNull();
    });

    it("closes when the pointer moves away from the tooltip", async () => {
      mockHoverLayout();
      await openByHover();
      const wrapper = getTrigger().parentElement!;
      mouse(wrapper, "mouseleave", { clientX: 130, clientY: 220 });
      mouse(document.body, "pointermove", { clientX: 130, clientY: 260 });
      await advance(0);
      expect(tooltip()).toBeNull();
    });

    it("closes after the grace period when the pointer stops in the gap", async () => {
      mockHoverLayout();
      await openByHover();
      const wrapper = getTrigger().parentElement!;
      mouse(wrapper, "mouseleave", { clientX: 130, clientY: 200 });
      await advance(299);
      expect(tooltip()).not.toBeNull();
      await advance(1);
      expect(tooltip()).toBeNull();
    });
  });
});
