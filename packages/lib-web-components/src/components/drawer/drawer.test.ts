import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { getActiveElement, getLayerStack } from "@minerva/core";
import { MinervaDrawer } from "./drawer";
import "../../elements/drawer";
import "../../elements/modal";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle, wait } from "../../../tests/utils";

const panel = (el: MinervaDrawer) =>
  el.shadowRoot!.querySelector<HTMLElement>("[part=panel]");

const setup = (attrs = "") =>
  mount<MinervaDrawer>(
    `<button id="before">Before</button>
     <minerva-drawer label="Filter books" ${attrs}>
       <button slot="trigger" id="open">Filters</button>
       <input id="author" aria-label="Author" />
       <button slot="footer" id="apply" data-drawer-close>Apply</button>
     </minerva-drawer>
     <button id="after">After</button>`,
    "minerva-drawer",
  );

afterEach(() => {
  resetDevWarnings();
  vi.restoreAllMocks();
  document.documentElement.removeAttribute("lang");
});

describe("<minerva-drawer>", () => {
  it("is registered", () => {
    expect(customElements.get("minerva-drawer")).toBe(MinervaDrawer);
  });

  it("renders nothing while closed; defaults to right / medium", async () => {
    const el = await setup();
    expect(panel(el)).toBeNull();
    expect(el.side).toBe("right");
    expect(el.size).toBe("medium");
    expect(el.getAttribute("side")).toBe("right");
    expect(el.getAttribute("size")).toBe("medium");
  });

  it("renders a modal dialog labelled by the title with side / size classes and a hidden description", async () => {
    const el = await setup(`side="left" size="small" open`);
    const dialog = panel(el)!;
    expect(dialog).toHaveAttribute("role", "dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog.getAttribute("aria-labelledby")).toBe("title");
    expect($(el, "#title").textContent?.trim()).toBe("Filter books");
    expect(dialog.classList).toContain("content");
    expect(dialog.classList).toContain("left");
    expect(dialog.classList).toContain("small");
    const description = $(el, "#description");
    expect(dialog.getAttribute("aria-describedby")).toBe("description");
    expect(description.classList).toContain("visuallyHidden");
    expect(description.textContent?.trim()).toBe("Drawer content");
    expect($(el, "[part=overlay]").classList).toContain("overlay");
  });

  it("renders a visible description when provided and a custom hidden one", async () => {
    const el = await setup(`open description="Narrow the list"`);
    const description = $(el, "#description");
    expect(description.classList).toContain("description");
    expect(description.textContent?.trim()).toBe("Narrow the list");
    el.description = "";
    el.hiddenDescription = "Book filters";
    await settle();
    expect($(el, "#description").textContent?.trim()).toBe("Book filters");
  });

  it.each(["small", "large", "full"] as const)(
    "applies the %s size class",
    async (size) => {
      const el = await setup(`open size="${size}"`);
      expect(panel(el)!.classList).toContain(size);
    },
  );

  it.each(["{Enter}", " "])(
    "opens from the trigger with %s and focuses the first tabbable",
    async (keys) => {
      const el = await setup();
      document.getElementById("open")!.focus();
      await userEvent.keyboard(keys);
      await settle();
      expect(el.open).toBe(true);
      expect(getActiveElement()).toBe(document.getElementById("author"));
    },
  );

  it("cycles Tab / Shift+Tab at the edges of the drawer", async () => {
    const el = await setup();
    el.show();
    await settle();
    // happy-dom's native Tab order ignores shadow roots: only the trap
    // edges (core focus scope) are exercised.
    const close = $(el, "[part=close-button]");
    close.focus();
    await userEvent.tab();
    expect(getActiveElement()).toBe(document.getElementById("author"));
    await userEvent.tab({ shift: true });
    expect(getActiveElement()).toBe(close);
  });

  it("Escape closes and returns focus to the trigger", async () => {
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
    await settle();
    expect(panel(el)).toBeNull();
    await wait(10);
    expect(getActiveElement()).toBe(opener);
  });

  it("a [data-drawer-close] element closes it and focus returns to the trigger", async () => {
    const el = await setup();
    const opener = document.getElementById("open")!;
    await userEvent.click(opener);
    await settle();
    document.getElementById("apply")!.focus();
    await userEvent.keyboard(" ");
    await settle();
    expect(el.open).toBe(false);
    await wait(10);
    expect(getActiveElement()).toBe(opener);
  });

  it("requests closing from the close button (localized) and the overlay", async () => {
    document.documentElement.lang = "fr";
    const el = await setup(`open`);
    const events: string[] = [];
    el.addEventListener("minerva-open-change", (e) =>
      events.push((e as CustomEvent).detail.reason),
    );
    const close = $(el, "[part=close-button]");
    expect(close.getAttribute("aria-label")).toBe("Fermer");
    await userEvent.click(close);
    await settle();
    expect(el.open).toBe(false);
    el.open = true;
    await settle();
    await wait(5);
    $(el, "[part=overlay]").dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true, composed: true }),
    );
    await settle();
    expect(el.open).toBe(false);
    expect(events).toEqual(["close-button", "outside"]);
  });

  it("hides the close button and accepts a custom close label", async () => {
    const el = await setup(`open close-label="Dismiss"`);
    expect($(el, "[part=close-button]").getAttribute("aria-label")).toBe(
      "Dismiss",
    );
    el.hideCloseButton = true;
    await settle();
    expect(el.shadowRoot!.querySelector("[part=close-button]")).toBeNull();
  });

  it("modal: focus moving outside does not close it", async () => {
    const el = await setup(`open`);
    document.getElementById("after")!.focus();
    await settle();
    expect(el.open).toBe(true);
  });

  it("a cancelled minerva-open-change keeps it open (controlled)", async () => {
    const el = await setup(`open`);
    el.addEventListener("minerva-open-change", (e) => e.preventDefault());
    await userEvent.keyboard("{Escape}");
    await settle();
    expect(el.open).toBe(true);
  });

  it("locks scroll and hides the rest of the page while modal", async () => {
    const el = await setup(`open`);
    expect(document.getElementById("before")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(document.body.style.overflow).toBe("hidden");
    expect(getLayerStack().at(-1)?.disableOutsidePointerEvents).toBe(true);
    el.hide();
    await settle();
    await wait(5);
    expect(document.body.style.overflow).not.toBe("hidden");
    expect(getLayerStack()).toHaveLength(0);
  });

  it("non-modal: no overlay / trap, closes when focus moves outside", async () => {
    const el = await setup(`non-modal`);
    el.show();
    await settle();
    expect(el.shadowRoot!.querySelector("[part=overlay]")).toBeNull();
    expect(panel(el)).not.toHaveAttribute("aria-modal");
    expect(document.getElementById("before")).not.toHaveAttribute(
      "aria-hidden",
    );
    expect(getLayerStack().at(-1)?.disableOutsidePointerEvents).toBe(false);
    document.getElementById("after")!.focus();
    await settle();
    expect(el.open).toBe(false);
  });

  it("nested in a modal: Escape closes the drawer only", async () => {
    document.body.innerHTML = `
      <minerva-modal id="outer" label="Outer" open>
        <minerva-drawer id="inner" label="Inner"><button>x</button></minerva-drawer>
      </minerva-modal>`;
    await settle();
    const outer = document.getElementById("outer") as HTMLElement & {
      open: boolean;
    };
    const inner = document.getElementById("inner") as MinervaDrawer;
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
    el.hide();
    await settle();
    await settle();
    expect(afterOpen).toHaveBeenCalledTimes(1);
    expect(afterClose).toHaveBeenCalledTimes(1);
  });

  it("warns about an invalid side in development", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const el = await setup(`side="middle" open`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("invalid side"));
    expect(panel(el)!.classList).toContain("right");
  });
});
