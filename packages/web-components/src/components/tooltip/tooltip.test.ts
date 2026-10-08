import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { getActiveElement, getLayerStack } from "@minerva/dom";
import { MinervaTooltip, MinervaTooltipProvider } from "./tooltip";
import type { MinervaModal } from "../modal/modal";
import "../../elements/tooltip";
import "../../elements/modal";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle, wait } from "../../../tests/utils";

const panel = (el: MinervaTooltip) =>
  el.shadowRoot!.querySelector<HTMLElement>("[role=tooltip]");
const wrapper = (el: MinervaTooltip) => $(el, ".tooltipTrigger");
const trigger = () => document.getElementById("t") as HTMLButtonElement;

const setup = (attrs = 'content="Hello"') =>
  mount<MinervaTooltip>(
    `<minerva-tooltip ${attrs}><button id="t" type="button">Trigger</button></minerva-tooltip>`,
  );

// happy-dom has no layout and user-event's hover does not fire mouseenter on
// the shadow wrapper of a slotted node: hover is driven by mouseenter /
// mouseleave on the trigger wrapper (what browsers fire when the pointer
// crosses the slotted trigger).
const mouse = (
  target: Element,
  type: string,
  init: MouseEventInit = {},
): void => {
  target.dispatchEvent(new MouseEvent(type, { composed: true, ...init }));
};

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

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  resetDevWarnings();
  document.body.innerHTML = "";
});

describe("<minerva-tooltip>", () => {
  it("is registered with its provider", () => {
    expect(customElements.get("minerva-tooltip")).toBe(MinervaTooltip);
    expect(customElements.get("minerva-tooltip-provider")).toBe(
      MinervaTooltipProvider,
    );
  });

  it("keeps the child as the only interactive element; closed by default", async () => {
    const el = await setup();
    expect(wrapper(el).classList).toContain("tooltipTrigger");
    expect(wrapper(el)).not.toHaveAttribute("role");
    expect(wrapper(el)).not.toHaveAttribute("tabindex");
    expect(panel(el)).toBeNull();
    expect(trigger()).not.toHaveAttribute("aria-description");
  });

  it("has the React defaults and reflects its state attributes", async () => {
    const el = await setup();
    expect(el.open).toBe(false);
    expect(el.placement).toBe("top");
    expect(el.color).toBe("neutral");
    expect(el.variant).toBe("solid");
    expect(el.shape).toBe("default");
    expect(el.animation).toBe("fade");
    expect(el.arrow).toBe(false);
    expect(el.disabled).toBe(false);
    expect(el.enterDelay).toBeUndefined();
    el.open = true;
    el.color = "danger";
    el.variant = "glass";
    el.arrow = true;
    el.disabled = true;
    await settle();
    for (const attr of ["open", "arrow", "disabled"]) {
      expect(el).toHaveAttribute(attr);
    }
    expect(el).toHaveAttribute("color", "danger");
    expect(el).toHaveAttribute("variant", "glass");
    // the default placement stays implicit (not reflected)
    expect(el).not.toHaveAttribute("placement");
    expect(el.placement).toBe("top");
  });

  it("parses offset as 'x y'", async () => {
    const el = await setup('content="Hi" offset="12 20"');
    expect(el.offset).toEqual([12, 20]);
    el.setAttribute("offset", "4,8");
    expect(el.offset).toEqual([4, 8]);
  });

  it("renders the React classes when open (defaults: neutral solid default, no arrow)", async () => {
    const el = await setup('content="Hello" open');
    const tip = panel(el)!;
    expect(tip.classList).toContain("tooltip");
    for (const c of ["neutral", "solid", "default", "animation-fade"]) {
      expect(tip.classList).toContain(c);
    }
    expect(tip).toHaveAttribute("popover", "manual");
    expect(tip.textContent?.trim()).toBe("Hello");
    expect(tip.querySelector(".tooltipArrow")).toBeNull();
    await wait(30);
    await settle();
    expect(tip.classList).toContain("show");
  });

  it("applies color, variant, shape, animation and arrow", async () => {
    const el = await setup(
      'content="Hello" open color="success" variant="subtle" shape="rounded" animation="scale" arrow aria-label="Tip"',
    );
    const tip = panel(el)!;
    for (const c of [
      "tooltip",
      "success",
      "subtle",
      "rounded",
      "arrow",
      "animation-scale",
    ]) {
      expect(tip.classList).toContain(c);
    }
    expect(tip.classList).not.toContain("neutral");
    expect(tip.classList).not.toContain("solid");
    expect(tip).toHaveAttribute("aria-label", "Tip");
    const arrow = tip.querySelector<HTMLElement>(".tooltipArrow")!;
    expect(arrow).not.toBeNull();
    expect(arrow.style.background).toBe("");
  });

  it("renders rich content from the content slot", async () => {
    const el = await mount<MinervaTooltip>(
      `<minerva-tooltip open><button id="t">T</button><span slot="content"><b>Rich</b> text</span></minerva-tooltip>`,
    );
    const slot =
      panel(el)!.querySelector<HTMLSlotElement>("slot[name=content]")!;
    expect(slot.assignedElements()[0].textContent).toBe("Rich text");
    expect(trigger()).toHaveAttribute("aria-description", "Rich text");
  });

  it("shows after enter-delay on hover and hides after leave-delay", async () => {
    const el = await setup('content="Hello" enter-delay="40" leave-delay="30"');
    mouse(wrapper(el), "mouseenter");
    await wait(20);
    await settle();
    expect(panel(el)).toBeNull();
    await wait(30);
    await settle();
    expect(panel(el)).not.toBeNull();
    expect(el.open).toBe(true);
    expect(trigger()).toHaveAttribute("aria-description", "Hello");

    mouse(wrapper(el), "mouseleave");
    await settle();
    expect(panel(el)).not.toBeNull();
    await wait(40);
    await settle();
    expect(panel(el)).toBeNull();
    expect(trigger()).not.toHaveAttribute("aria-description");
  });

  it("cancels opening when the pointer leaves before the enter delay", async () => {
    const el = await setup('content="Hello" enter-delay="30"');
    const onChange = vi.fn();
    el.addEventListener("minerva-open-change", onChange);
    mouse(wrapper(el), "mouseenter");
    mouse(wrapper(el), "mouseleave");
    await wait(60);
    await settle();
    expect(panel(el)).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("defaults to a 200ms enter delay", async () => {
    const el = await setup();
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    mouse(wrapper(el), "mouseenter");
    vi.advanceTimersByTime(199);
    expect(el.open).toBe(false);
    vi.advanceTimersByTime(1);
    expect(el.open).toBe(true);
  });

  it("opens on focus, closes on Escape and on blur", async () => {
    document.body.innerHTML = `<minerva-tooltip content="Hello"><button id="t">Trigger</button></minerva-tooltip><button id="next">Next</button>`;
    await settle();
    const el = document.querySelector("minerva-tooltip")!;
    await userEvent.tab();
    await settle();
    expect(getActiveElement()).toBe(trigger());
    expect(el.open).toBe(true);
    expect(panel(el)).not.toBeNull();

    await userEvent.keyboard("{Escape}");
    await settle();
    expect(el.open).toBe(false);
    expect(getActiveElement()).toBe(trigger());

    await userEvent.tab({ shift: true });
    await userEvent.tab();
    await settle();
    expect(el.open).toBe(true);

    await userEvent.tab();
    await settle();
    expect(getActiveElement()).toBe(document.getElementById("next"));
    expect(el.open).toBe(false);
  });

  it("ignores Escape when already closed", async () => {
    const el = await setup();
    const onChange = vi.fn();
    el.addEventListener("minerva-open-change", onChange);
    trigger().focus();
    await settle();
    await userEvent.keyboard("{Escape}");
    await settle();
    expect(onChange).toHaveBeenCalledTimes(2);
    await userEvent.keyboard("{Escape}");
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("dismisses with Escape when opened by hover (focus elsewhere)", async () => {
    const el = await setup('content="Hello" enter-delay="0"');
    mouse(wrapper(el), "mouseenter");
    await settle();
    expect(el.open).toBe(true);
    await userEvent.keyboard("{Escape}");
    await settle();
    expect(el.open).toBe(false);
  });

  it("does not swallow Enter / Space for the wrapped button", async () => {
    const el = await setup();
    const onClick = vi.fn();
    const prevented: boolean[] = [];
    trigger().addEventListener("click", onClick);
    trigger().addEventListener("keydown", (e) =>
      queueMicrotask(() => prevented.push(e.defaultPrevented)),
    );
    trigger().focus();
    await settle();
    expect(el.open).toBe(true);
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(prevented.every((p) => p === false)).toBe(true);
  });

  it("does not open when disabled", async () => {
    const el = await setup('content="Hello" disabled enter-delay="0"');
    mouse(wrapper(el), "mouseenter");
    trigger().focus();
    await settle();
    expect(panel(el)).toBeNull();
    expect(trigger()).not.toHaveAttribute("aria-description");
    el.open = true;
    await settle();
    expect(panel(el)).toBeNull();
  });

  it("fires a cancelable minerva-open-change; preventDefault keeps it closed", async () => {
    const el = await setup();
    const details: unknown[] = [];
    el.addEventListener("minerva-open-change", (e) => {
      details.push((e as CustomEvent).detail);
      e.preventDefault();
    });
    trigger().focus();
    await settle();
    expect(details).toEqual([{ open: true }]);
    expect(el.open).toBe(false);
    expect(panel(el)).toBeNull();
  });

  it("programmatic open / show / hide / toggle do not emit", async () => {
    const el = await setup();
    const onChange = vi.fn();
    el.addEventListener("minerva-open-change", onChange);
    el.show();
    await settle();
    expect(panel(el)).not.toBeNull();
    el.hide();
    await settle();
    expect(panel(el)).toBeNull();
    el.toggle();
    await settle();
    expect(el.open).toBe(true);
    el.toggle();
    el.open = true;
    await settle();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("registers a non-modal dismissable layer only while open", async () => {
    const el = await setup('content="Hello" open');
    expect(getLayerStack().at(-1)?.element).toBe(panel(el));
    el.open = false;
    await settle();
    expect(getLayerStack()).toHaveLength(0);
  });

  it("does not close on an outside pointer down (only Escape / hover / blur)", async () => {
    const el = await setup('content="Hello" open');
    await wait(5);
    document.body.dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true }),
    );
    await settle();
    expect(el.open).toBe(true);
  });

  describe("aria-description on the trigger", () => {
    it("describes the trigger while shown and restores its own value", async () => {
      const el = await mount<MinervaTooltip>(
        `<minerva-tooltip content="Saves the draft"><button id="t" aria-description="hint">Save</button></minerva-tooltip>`,
      );
      el.open = true;
      await settle();
      expect(trigger()).toHaveAttribute(
        "aria-description",
        "hint Saves the draft",
      );
      el.open = false;
      await settle();
      expect(trigger()).toHaveAttribute("aria-description", "hint");
    });

    it("follows content changes and is removed on disconnect", async () => {
      const el = await setup('content="One" open');
      expect(trigger()).toHaveAttribute("aria-description", "One");
      el.content = "Two";
      await settle();
      expect(trigger()).toHaveAttribute("aria-description", "Two");
      const button = trigger();
      el.remove();
      expect(button).not.toHaveAttribute("aria-description");
    });

    it("moves to the new trigger when the slotted element changes", async () => {
      await setup('content="Tip" open');
      const old = trigger();
      const next = document.createElement("a");
      next.href = "#";
      next.textContent = "Link";
      old.replaceWith(next);
      await settle();
      expect(old).not.toHaveAttribute("aria-description");
      expect(next).toHaveAttribute("aria-description", "Tip");
    });

    it("describes the wrapper for plain-text triggers", async () => {
      const el = await mount<MinervaTooltip>(
        `<minerva-tooltip content="Hi" open>plain text</minerva-tooltip>`,
      );
      expect(wrapper(el)).toHaveAttribute("aria-describedby", "tooltip");
      expect(panel(el)!.id).toBe("tooltip");
    });

    it("uses aria-label as the description text", async () => {
      await setup('content="Hello" aria-label="Tip" open');
      expect(trigger()).toHaveAttribute("aria-description", "Tip");
    });
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
      mockHoverLayout();
      const el = await setup('content="Hello" enter-delay="0"');
      mouse(wrapper(el), "mouseenter");
      await settle();
      expect(el.open).toBe(true);
      vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
      return el;
    };

    const flush = async () => {
      // Lit updates run on microtasks (not faked)
      await Promise.resolve();
      await Promise.resolve();
    };

    it("stays open while the pointer crosses the gap onto the tooltip", async () => {
      const el = await openByHover();
      mouse(wrapper(el), "mouseleave", { clientX: 130, clientY: 200 });
      document.body.dispatchEvent(
        new PointerEvent("pointermove", {
          bubbles: true,
          clientX: 130,
          clientY: 185,
        }),
      );
      vi.advanceTimersByTime(100);
      expect(el.open).toBe(true);

      mouse(panel(el)!, "mouseenter");
      vi.advanceTimersByTime(1000);
      expect(el.open).toBe(true);

      mouse(panel(el)!, "mouseleave");
      vi.advanceTimersByTime(0);
      await flush();
      expect(el.open).toBe(false);
    });

    it("closes when the pointer moves away from the tooltip", async () => {
      const el = await openByHover();
      mouse(wrapper(el), "mouseleave", { clientX: 130, clientY: 220 });
      document.body.dispatchEvent(
        new PointerEvent("pointermove", {
          bubbles: true,
          clientX: 130,
          clientY: 260,
        }),
      );
      vi.advanceTimersByTime(0);
      expect(el.open).toBe(false);
    });

    it("closes after the grace period when the pointer stops in the gap", async () => {
      const el = await openByHover();
      mouse(wrapper(el), "mouseleave", { clientX: 130, clientY: 200 });
      vi.advanceTimersByTime(299);
      expect(el.open).toBe(true);
      vi.advanceTimersByTime(1);
      expect(el.open).toBe(false);
    });
  });

  describe("<minerva-tooltip-provider>", () => {
    it("sets the default delays; an explicit enter-delay wins", async () => {
      vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
      document.body.innerHTML = `
        <minerva-tooltip-provider enter-delay="50" leave-delay="40">
          <minerva-tooltip id="a" content="A"><button>A</button></minerva-tooltip>
          <minerva-tooltip id="b" content="B" enter-delay="10"><button>B</button></minerva-tooltip>
        </minerva-tooltip-provider>`;
      const a = document.getElementById("a") as MinervaTooltip;
      const b = document.getElementById("b") as MinervaTooltip;
      await a.updateComplete;
      await b.updateComplete;
      // explicit enter-delay wins over the provider
      mouse(wrapper(b), "mouseenter");
      vi.advanceTimersByTime(9);
      expect(b.open).toBe(false);
      vi.advanceTimersByTime(1);
      expect(b.open).toBe(true);
      // closing b now would skip a's delay: a opens before b closes
      mouse(wrapper(a), "mouseenter");
      vi.advanceTimersByTime(49);
      expect(a.open).toBe(false);
      vi.advanceTimersByTime(1);
      expect(a.open).toBe(true);
      mouse(wrapper(a), "mouseleave");
      vi.advanceTimersByTime(39);
      expect(a.open).toBe(true);
      vi.advanceTimersByTime(1);
      expect(a.open).toBe(false);
    });

    it("skips the delay when moving quickly between tooltips", async () => {
      vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
      document.body.innerHTML = `
        <minerva-tooltip-provider enter-delay="300" skip-delay="200">
          <minerva-tooltip id="a" content="First"><button>A</button></minerva-tooltip>
          <minerva-tooltip id="b" content="Second"><button>B</button></minerva-tooltip>
        </minerva-tooltip-provider>`;
      const a = document.getElementById("a") as MinervaTooltip;
      const b = document.getElementById("b") as MinervaTooltip;
      await a.updateComplete;
      await b.updateComplete;
      mouse(wrapper(a), "mouseenter");
      vi.advanceTimersByTime(300);
      expect(a.open).toBe(true);
      mouse(wrapper(a), "mouseleave");
      vi.advanceTimersByTime(1);
      expect(a.open).toBe(false);
      mouse(wrapper(b), "mouseenter");
      expect(b.open).toBe(true);
      mouse(wrapper(b), "mouseleave");
      vi.advanceTimersByTime(500);
      mouse(wrapper(a), "mouseenter");
      expect(a.open).toBe(false);
    });
  });

  it("opens immediately with enter-delay 0 and follows the cursor", async () => {
    const el = await setup('content="Follow" enter-delay="0" follow-cursor');
    mouse(wrapper(el), "mouseenter", { clientX: 10, clientY: 20 });
    await settle();
    const tip = panel(el)!;
    expect(tip.classList).toContain("followCursor");
    document.dispatchEvent(
      new MouseEvent("mousemove", { clientX: 40, clientY: 50 }),
    );
    await wait(30);
    await settle();
    expect(tip.classList).toContain("show");
  });

  describe("dev warnings", () => {
    it("warns about a tooltip without content", async () => {
      const warn = vi.spyOn(console, "error").mockImplementation(() => {});
      await setup("");
      await wait(5);
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining("has no content"),
      );
    });

    it("warns about a trigger keyboard users cannot reach", async () => {
      const warn = vi.spyOn(console, "error").mockImplementation(() => {});
      await mount(
        `<minerva-tooltip content="Hi"><span>icon</span></minerva-tooltip>`,
      );
      await wait(5);
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining("not focusable"),
      );
    });

    it("does not warn for a focusable trigger with content", async () => {
      const warn = vi.spyOn(console, "error").mockImplementation(() => {});
      await setup();
      await wait(5);
      expect(warn).not.toHaveBeenCalled();
    });
  });
});

// WAI-ARIA APG tooltip: shown on keyboard focus, dismissed with Escape
// (WCAG 1.4.13) without affecting an enclosing dialog, hidden on blur.
describe("<minerva-tooltip> keyboard inside a <minerva-modal>", () => {
  it("Escape hides only the tooltip; a second Escape closes the modal", async () => {
    const modal = await mount<MinervaModal>(
      `<minerva-modal open label="Settings">
         <input aria-label="Name" id="name" />
         <minerva-tooltip content="Saves the draft"><button id="t" type="button">Save</button></minerva-tooltip>
       </minerva-modal>`,
    );
    const onChange = vi.fn();
    modal.addEventListener("minerva-open-change", (e) => {
      if (e.target === modal) onChange((e as CustomEvent).detail);
    });
    const tooltip = document.querySelector("minerva-tooltip")!;
    await wait(10);
    expect(getActiveElement()).toBe(document.getElementById("name"));
    await userEvent.tab();
    await settle();
    expect(getActiveElement()).toBe(trigger());
    expect(tooltip.open).toBe(true);
    expect(panel(tooltip)).not.toBeNull();
    expect(trigger()).toHaveAttribute("aria-description", "Saves the draft");

    await userEvent.keyboard("{Escape}");
    await settle();
    expect(tooltip.open).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
    expect(modal.open).toBe(true);
    expect(getActiveElement()).toBe(trigger());

    await userEvent.keyboard("{Escape}");
    await settle();
    expect(onChange).toHaveBeenCalledWith({ open: false, reason: "escape" });
    expect(modal.open).toBe(false);
  });

  it("hides on blur when Tab moves on inside the modal", async () => {
    // Opened after mount: a modal opened during the initial parse focuses
    // before the nested tooltip rendered its slot (the button is not in the
    // flat tree yet).
    const modal = await mount<MinervaModal>(
      `<minerva-modal label="Settings">
         <minerva-tooltip content="Saves the draft"><button id="t" type="button">Save</button></minerva-tooltip>
         <input aria-label="Name" id="name" />
       </minerva-modal>`,
    );
    modal.open = true;
    await settle();
    const tooltip = document.querySelector("minerva-tooltip")!;
    await wait(10);
    await settle();
    expect(getActiveElement()).toBe(trigger());
    expect(tooltip.open).toBe(true);
    await userEvent.tab();
    await settle();
    expect(getActiveElement()).toBe(document.getElementById("name"));
    expect(tooltip.open).toBe(false);
  });
});
