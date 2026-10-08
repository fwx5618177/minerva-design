import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { getActiveElement, getLayerStack } from "@minerva/dom";
import { MinervaModal } from "./modal";
import "../../elements/modal";
import "../../elements/button";
import { $, mount, settle, wait } from "../../../tests/utils";

const panel = (el: MinervaModal) =>
  el.shadowRoot!.querySelector<HTMLElement>("[part=content]");

const setup = () =>
  mount<MinervaModal>(
    `<button id="before">before</button>
     <minerva-modal label="Edit profile" description="Change your name">
       <button slot="trigger" id="open">Open</button>
       <input id="name" />
       <button slot="footer" id="save">Save</button>
     </minerva-modal>`,
    "minerva-modal",
  );

describe("<minerva-modal>", () => {
  it("presence: stays rendered with data-state=closed until the exit animation ends", async () => {
    const el = await setup();
    el.open = true;
    await settle();
    const dialog = panel(el)!;
    dialog.style.animationName = "modal-zoom-out";
    dialog.style.animationDuration = "150ms";
    el.open = false;
    await settle();
    expect(panel(el)).toBe(dialog);
    expect(dialog).toHaveAttribute("data-state", "closed");
    dialog.dispatchEvent(new Event("animationend"));
    await settle();
    expect(panel(el)).toBeNull();
  });

  it("is closed by default and opens from its trigger slot", async () => {
    const el = await setup();
    expect(panel(el)).toBeNull();
    await userEvent.click(document.getElementById("open")!);
    await settle();
    expect(el.open).toBe(true);
    const dialog = panel(el)!;
    expect(dialog).toHaveAttribute("role", "dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect($(el, "#title").textContent?.trim()).toBe("Edit profile");
    expect(dialog.getAttribute("aria-labelledby")).toBe("title");
    expect(dialog.getAttribute("aria-describedby")).toBe("description");
    expect(dialog.classList).toContain("content");
    expect(dialog.classList).toContain("medium");
  });

  it("moves focus to the first tabbable (slotted) element and traps Tab", async () => {
    const el = await setup();
    document.getElementById("open")!.focus();
    el.open = true;
    await settle();
    expect(getActiveElement()).toBe(document.getElementById("name"));
    // user-event computes the "native" Tab order of happy-dom, which knows
    // nothing about shadow roots: only the trap edges (handled by core's
    // focus scope, as in browsers) are exercised here.
    const close = $(el, "[part=close-button]");
    close.focus();
    await userEvent.tab();
    expect(getActiveElement()).toBe(document.getElementById("name"));
    await userEvent.tab({ shift: true });
    expect(getActiveElement()).toBe(close);
  });

  it("closes on Escape and returns focus to the opener", async () => {
    const el = await setup();
    const opener = document.getElementById("open")!;
    await userEvent.click(opener);
    await settle();
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
    expect(getActiveElement()).toBe(opener);
  });

  it("closes with the close button (localized label)", async () => {
    document.documentElement.lang = "zh";
    const el = await setup();
    el.open = true;
    await settle();
    const close = $(el, "[part=close-button]");
    expect(close.getAttribute("aria-label")).toBe("关闭");
    await userEvent.click(close);
    await settle();
    expect(el.open).toBe(false);
  });

  it("closes on a pointer down outside the panel (the overlay)", async () => {
    const el = await setup();
    el.open = true;
    await settle();
    await wait(5); // dismissable layers ignore the opening pointer for one tick
    $(el, "[part=overlay]").dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true, composed: true }),
    );
    await settle();
    expect(el.open).toBe(false);
  });

  it("a cancelled minerva-open-change keeps it open (controlled)", async () => {
    const el = await setup();
    el.open = true;
    await settle();
    el.addEventListener("minerva-open-change", (e) => e.preventDefault());
    await userEvent.keyboard("{Escape}");
    await settle();
    expect(el.open).toBe(true);
  });

  it("locks scroll, hides the rest of the page and registers a modal layer", async () => {
    const el = await setup();
    el.open = true;
    await settle();
    expect(document.getElementById("before")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(document.body.style.overflow).toBe("hidden");
    const stack = getLayerStack();
    expect(stack.at(-1)?.element).toBe(panel(el));
    expect(stack.at(-1)?.disableOutsidePointerEvents).toBe(true);
    el.open = false;
    await settle();
    await wait(5);
    expect(document.getElementById("before")).not.toHaveAttribute(
      "aria-hidden",
    );
    expect(document.body.style.overflow).not.toBe("hidden");
    expect(getLayerStack()).toHaveLength(0);
  });

  it("nested modals: Escape only closes the topmost", async () => {
    document.body.innerHTML = `
      <minerva-modal id="outer" label="Outer" open>
        <minerva-modal id="inner" label="Inner"><button>x</button></minerva-modal>
      </minerva-modal>`;
    await settle();
    const outer = document.getElementById("outer") as MinervaModal;
    const inner = document.getElementById("inner") as MinervaModal;
    inner.open = true;
    await settle();
    await userEvent.keyboard("{Escape}");
    await settle();
    expect(inner.open).toBe(false);
    expect(outer.open).toBe(true);
  });

  it("fires minerva-after-open / minerva-after-close", async () => {
    const el = await setup();
    const afterOpen = vi.fn();
    const afterClose = vi.fn();
    el.addEventListener("minerva-after-open", afterOpen);
    el.addEventListener("minerva-after-close", afterClose);
    el.show();
    await settle();
    expect(afterOpen).toHaveBeenCalledTimes(1);
    el.hide();
    await settle();
    await settle();
    expect(afterClose).toHaveBeenCalledTimes(1);
    expect(panel(el)).toBeNull();
  });

  it("supports alertdialog role, size and a header slot", async () => {
    const el = await mount<MinervaModal>(
      `<minerva-modal open size="large" dialog-role="alertdialog"><span slot="header">Delete?</span></minerva-modal>`,
    );
    expect(panel(el)).toHaveAttribute("role", "alertdialog");
    expect(panel(el)!.classList).toContain("large");
    expect(el.shadowRoot!.querySelector("slot[name=header]")).not.toBeNull();
  });

  it("stays open when focus moves outside programmatically (the trap pulls it back)", async () => {
    const el = await setup();
    el.open = true;
    await settle();
    document.getElementById("before")!.focus();
    await settle();
    expect(el.open).toBe(true);
  });

  it("is registered", () => {
    expect(customElements.get("minerva-modal")).toBe(MinervaModal);
  });
});
