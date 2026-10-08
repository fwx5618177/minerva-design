import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { getActiveElement, getLayerStack, isScrollLocked } from "@minerva/dom";
import { MinervaPopover } from "./popover";
import "../../elements/popover";
import "../../elements/modal";
import type { MinervaModal } from "../modal/modal";
import { resetDevWarnings } from "../../internal/dev";
import { mount, settle, wait } from "../../../tests/utils";

const panel = (el: MinervaPopover) =>
  el.shadowRoot!.querySelector<HTMLElement>("[part=content]");
const byId = (id: string) => document.getElementById(id) as HTMLElement;

const setup = (attrs = "") =>
  mount<MinervaPopover>(
    `<button id="before">Before</button>
     <minerva-popover aria-label="Sort options" ${attrs}>
       <button slot="trigger" id="trigger">Sort</button>
       <button id="newest">Newest</button>
       <button id="oldest" data-popover-close>Oldest</button>
     </minerva-popover>
     <button id="after">After</button>`,
    "minerva-popover",
  );

afterEach(() => {
  resetDevWarnings();
  vi.restoreAllMocks();
});

describe("<minerva-popover>", () => {
  it("is registered", () => {
    expect(customElements.get("minerva-popover")).toBe(MinervaPopover);
  });

  it("is closed by default and opens on trigger click (trigger ARIA, dialog)", async () => {
    const el = await setup();
    const trigger = byId("trigger");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("data-state", "closed");
    expect(panel(el)).toBeNull();
    expect(el.modal).toBe(false);
    expect(el.side).toBe("bottom");
    expect(el.align).toBe("center");
    await userEvent.click(trigger);
    await settle();
    expect(el.open).toBe(true);
    expect(el).toHaveAttribute("open");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const dialog = panel(el)!;
    expect(dialog).toHaveAttribute("role", "dialog");
    expect(dialog).toHaveAttribute("aria-label", "Sort options");
    expect(dialog).not.toHaveAttribute("aria-modal");
    expect(dialog.classList).toContain("content");
    expect(dialog).toHaveAttribute("data-side", "bottom");
    expect(dialog.querySelector(".arrow")).toBeNull();
    expect(el.shadowRoot!.querySelector(".positioner")!.classList).toContain(
      "positioner",
    );
  });

  it.each(["{Enter}", " "])(
    "opens from the trigger with %s and focuses the first tabbable",
    async (keys) => {
      const el = await setup();
      byId("trigger").focus();
      await userEvent.keyboard(keys);
      await settle();
      expect(el.open).toBe(true);
      expect(getActiveElement()).toBe(byId("newest"));
    },
  );

  it("Escape closes from inside the panel and returns focus to the trigger", async () => {
    const el = await setup();
    byId("trigger").focus();
    await userEvent.keyboard("{Enter}");
    await settle();
    byId("oldest").focus();
    const onChange = vi.fn();
    el.addEventListener("minerva-open-change", onChange);
    await userEvent.keyboard("{Escape}");
    await settle();
    expect(el.open).toBe(false);
    expect(onChange.mock.calls[0][0].detail).toEqual({
      open: false,
      reason: "escape",
    });
    await wait(10);
    expect(getActiveElement()).toBe(byId("trigger"));
    expect(byId("trigger")).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles closed when the trigger is clicked again", async () => {
    const el = await setup();
    await userEvent.click(byId("trigger"));
    await settle();
    await wait(5);
    await userEvent.click(byId("trigger"));
    await settle();
    expect(el.open).toBe(false);
  });

  it("closes via a [data-popover-close] element and by clicking outside", async () => {
    const el = await setup();
    await userEvent.click(byId("trigger"));
    await settle();
    await userEvent.click(byId("oldest"));
    await settle();
    expect(el.open).toBe(false);
    await userEvent.click(byId("trigger"));
    await settle();
    await wait(5);
    await userEvent.click(byId("after"));
    await settle();
    expect(el.open).toBe(false);
  });

  it("Tab past the last tabbable closes it and moves focus after the trigger", async () => {
    const el = await setup();
    byId("trigger").focus();
    await userEvent.keyboard("{Enter}");
    await settle();
    byId("oldest").focus();
    await userEvent.tab();
    await settle();
    expect(el.open).toBe(false);
    expect(getActiveElement()).toBe(byId("after"));
    await wait(10);
    expect(getActiveElement()).toBe(byId("after"));
  });

  it("Shift+Tab before the first tabbable closes it and moves focus before the trigger", async () => {
    const el = await setup();
    byId("trigger").focus();
    await userEvent.keyboard("{Enter}");
    await settle();
    expect(getActiveElement()).toBe(byId("newest"));
    await userEvent.tab({ shift: true });
    await settle();
    expect(el.open).toBe(false);
    expect(getActiveElement()).toBe(byId("before"));
    await wait(10);
    expect(getActiveElement()).toBe(byId("before"));
  });

  it("closes when focus leaves a non-modal popover", async () => {
    const el = await setup();
    await userEvent.click(byId("trigger"));
    await settle();
    byId("after").focus();
    await settle();
    expect(el.open).toBe(false);
    expect(getActiveElement()).toBe(byId("after"));
  });

  it("modal: Tab loops inside, the page is hidden / scroll locked, outside click closes", async () => {
    const el = await setup("modal");
    byId("trigger").focus();
    await userEvent.keyboard("{Enter}");
    await settle();
    expect(panel(el)).toHaveAttribute("aria-modal", "true");
    expect(byId("before")).toHaveAttribute("aria-hidden", "true");
    expect(isScrollLocked()).toBe(true);
    expect(document.body.style.pointerEvents).toBe("none");
    byId("oldest").focus();
    await userEvent.tab();
    expect(getActiveElement()).toBe(byId("newest"));
    await userEvent.tab({ shift: true });
    expect(getActiveElement()).toBe(byId("oldest"));
    expect(el.open).toBe(true);
    await wait(5);
    byId("after").dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true, composed: true }),
    );
    await settle();
    expect(el.open).toBe(false);
    await wait(5);
    expect(isScrollLocked()).toBe(false);
    expect(byId("before")).not.toHaveAttribute("aria-hidden");
  });

  it("modal: focus moving outside does not close it (trap pulls it back)", async () => {
    const el = await setup("modal open");
    byId("after").focus();
    await settle();
    expect(el.open).toBe(true);
    expect(getActiveElement()).not.toBe(byId("after"));
  });

  it("a cancelled minerva-open-change keeps it open (controlled)", async () => {
    const el = await setup("open");
    el.addEventListener("minerva-open-change", (e) => e.preventDefault());
    await wait(5);
    await userEvent.keyboard("{Escape}");
    await userEvent.click(byId("after"));
    await settle();
    expect(el.open).toBe(true);
  });

  it("renders an arrow and passes side / align through", async () => {
    const el = await setup(`open arrow side="top" align="start"`);
    expect(el.shadowRoot!.querySelector("[part=arrow]")!.classList).toContain(
      "arrowWrapper",
    );
    expect(el.shadowRoot!.querySelector("svg.arrow")).not.toBeNull();
    expect(el.getAttribute("side")).toBe("top");
    el.side = "left";
    await settle();
    expect(el).toHaveAttribute("side", "left");
  });

  it("anchors to the `anchor` element and registers a layer with the trigger as branch", async () => {
    document.body.innerHTML = `<div id="field">field</div>
      <minerva-popover anchor="field" open><button slot="trigger">T</button><p>x</p></minerva-popover>`;
    await settle();
    const stack = getLayerStack();
    expect(stack).toHaveLength(1);
    const positioner = document
      .querySelector("minerva-popover")!
      .shadowRoot!.querySelector(".positioner");
    expect(stack[0].element).toBe(positioner);
  });

  it("inside a modal: Escape closes the popover first, then the modal", async () => {
    document.body.innerHTML = `
      <minerva-modal id="modal" label="Dialog" open>
        <minerva-popover id="pop" aria-label="Inner">
          <button slot="trigger" id="t">T</button>
          <button id="in">In</button>
        </minerva-popover>
      </minerva-modal>`;
    await settle();
    const modal = byId("modal") as unknown as MinervaModal;
    const pop = byId("pop") as unknown as MinervaPopover;
    byId("t").focus();
    await userEvent.keyboard("{Enter}");
    await settle();
    expect(pop.open).toBe(true);
    expect(getActiveElement()).toBe(byId("in"));
    await userEvent.keyboard("{Escape}");
    await settle();
    expect(pop.open).toBe(false);
    expect(modal.open).toBe(true);
    await wait(10);
    expect(getActiveElement()).toBe(byId("t"));
    await userEvent.keyboard("{Escape}");
    await settle();
    expect(modal.open).toBe(false);
  });

  it("inside a modal: Tab out moves on within the modal", async () => {
    document.body.innerHTML = `
      <button id="page">page</button>
      <minerva-modal label="Dialog" open hide-close-button>
        <minerva-popover id="pop">
          <button slot="trigger" id="t">T</button>
          <button id="in">In</button>
        </minerva-popover>
        <button id="next">Next</button>
      </minerva-modal>`;
    await settle();
    const pop = byId("pop") as unknown as MinervaPopover;
    byId("t").focus();
    await userEvent.keyboard("{Enter}");
    await settle();
    expect(getActiveElement()).toBe(byId("in"));
    await userEvent.tab();
    await settle();
    expect(pop.open).toBe(false);
    expect(getActiveElement()).toBe(byId("next"));
  });

  it("fires minerva-after-open / minerva-after-close", async () => {
    const el = await setup();
    const afterOpen = vi.fn();
    const afterClose = vi.fn();
    el.addEventListener("minerva-after-open", afterOpen);
    el.addEventListener("minerva-after-close", afterClose);
    el.show();
    await settle();
    el.hide();
    await settle();
    await settle();
    expect(afterOpen).toHaveBeenCalledTimes(1);
    expect(afterClose).toHaveBeenCalledTimes(1);
    expect(panel(el)).toBeNull();
  });

  it("warns when there is neither a trigger nor an anchor", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-popover><p>x</p></minerva-popover>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("trigger"));
  });
});
