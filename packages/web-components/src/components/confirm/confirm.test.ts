import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { getActiveElement, getLayerStack } from "@minerva/dom";
import {
  MinervaConfirmDialog,
  MinervaConfirmProvider,
  confirm,
  confirmFor,
  confirmScopeOf,
} from "../../elements/confirm";
import type { MinervaButton } from "../button/button";
import type { MinervaModal } from "../modal/modal";
import "../../elements/modal";
import "../../elements/config";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle, wait } from "../../../tests/utils";

const panel = (el: MinervaConfirmDialog) =>
  el.shadowRoot!.querySelector<HTMLElement>("[part=content]");
const cancelButton = (el: MinervaConfirmDialog) =>
  $<MinervaButton>(el, "[part=cancel-button]");
const confirmButton = (el: MinervaConfirmDialog) =>
  $<MinervaButton>(el, "[part=confirm-button]");
/** The native <button> rendered by a <minerva-button>. */
const native = (button: MinervaButton) =>
  $<HTMLButtonElement>(button, "button");
const dialogs = () =>
  Array.from(document.querySelectorAll("minerva-confirm-dialog"));
/** The single open confirm dialog (waits for it). */
const current = async () => {
  await settle();
  const [dialog] = dialogs();
  if (!dialog) throw new Error("no confirm dialog");
  return dialog;
};

afterEach(() => {
  resetDevWarnings();
  vi.restoreAllMocks();
  document.documentElement.lang = "";
});

describe("<minerva-confirm-dialog> (declarative)", () => {
  it("is registered (with its <minerva-button> dependency)", () => {
    expect(customElements.get("minerva-confirm-dialog")).toBe(
      MinervaConfirmDialog,
    );
    expect(customElements.get("minerva-button")).toBeDefined();
  });

  it("is an alertdialog labelled by its title and described by its description", async () => {
    const el = await mount<MinervaConfirmDialog>(
      `<minerva-confirm-dialog open label="Delete chapter?" description="This cannot be undone" color="danger"></minerva-confirm-dialog>`,
    );
    const dialog = panel(el)!;
    expect(dialog).toHaveAttribute("role", "alertdialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog.classList).toContain("content");
    expect(dialog.classList).toContain("small");
    expect(
      $(el, `#${dialog.getAttribute("aria-labelledby")}`).textContent?.trim(),
    ).toBe("Delete chapter?");
    expect(
      $(el, `#${dialog.getAttribute("aria-describedby")}`).textContent?.trim(),
    ).toBe("This cannot be undone");
    const remove = confirmButton(el);
    expect(remove.textContent?.trim()).toBe("Delete");
    expect(remove.color).toBe("danger");
    expect(native(remove).classList).toContain("danger");
    expect(native(remove).classList).toContain("variant-solid");
    expect(native(remove)).toHaveAttribute("type", "button");
    expect($(el, ".footer")).toBe(remove.parentElement);
    expect($(el, ".body")).toBeTruthy();
  });

  it("defaults the confirm label by color and locks cancel while loading", async () => {
    const el = await mount<MinervaConfirmDialog>(
      `<minerva-confirm-dialog open label="A"></minerva-confirm-dialog>`,
    );
    const cancel = cancelButton(el);
    expect(cancel.textContent?.trim()).toBe("Cancel");
    expect(native(cancel).classList).toContain("neutral");
    expect(native(cancel).classList).toContain("variant-outline");
    expect(confirmButton(el).textContent?.trim()).toBe("Confirm");
    expect(native(confirmButton(el)).classList).toContain("primary");
    el.color = "warning";
    await settle();
    expect(confirmButton(el).textContent?.trim()).toBe("Confirm");
    expect(native(confirmButton(el)).classList).toContain("warning");

    el.loading = true;
    await settle();
    expect(native(cancel)).toBeDisabled();
    const busy = native(confirmButton(el));
    expect(busy).toHaveAttribute("aria-busy", "true");
    expect(busy).not.toBeDisabled();
    el.confirmDisabled = true;
    await settle();
    expect(native(confirmButton(el))).toBeDisabled();
  });

  it("uses custom labels", async () => {
    const el = await mount<MinervaConfirmDialog>(
      `<minerva-confirm-dialog open label="Publish chapter" confirm-label="Publish" cancel-label="Not now" close-label="Dismiss"></minerva-confirm-dialog>`,
    );
    expect(confirmButton(el).textContent?.trim()).toBe("Publish");
    expect(cancelButton(el).textContent?.trim()).toBe("Not now");
    expect($(el, "[part=close-button]")).toHaveAttribute(
      "aria-label",
      "Dismiss",
    );
  });

  it("localizes the default labels (lang / <minerva-config locale>)", async () => {
    document.documentElement.lang = "zh";
    const el = await mount<MinervaConfirmDialog>(
      `<minerva-confirm-dialog open label="A" color="danger"></minerva-confirm-dialog>`,
    );
    expect(confirmButton(el).textContent?.trim()).toBe("删除");
    expect(cancelButton(el).textContent?.trim()).toBe("取消");
    expect($(el, "[part=close-button]")).toHaveAttribute("aria-label", "关闭");

    document.documentElement.lang = "";
    const scoped = await mount<MinervaConfirmDialog>(
      `<minerva-config locale="fr"><minerva-confirm-dialog open label="A"></minerva-confirm-dialog></minerva-config>`,
      "minerva-confirm-dialog",
    );
    expect(cancelButton(scoped).textContent?.trim()).toBe("Annuler");
  });

  it("Cancel closes with minerva-open-change + minerva-cancel; Confirm fires minerva-confirm and closes", async () => {
    const el = await mount<MinervaConfirmDialog>(
      `<minerva-confirm-dialog open label="A"></minerva-confirm-dialog>`,
    );
    const changes: unknown[] = [];
    const cancels: unknown[] = [];
    const confirms = vi.fn();
    el.addEventListener("minerva-open-change", (e) =>
      changes.push((e as CustomEvent).detail),
    );
    el.addEventListener("minerva-cancel", (e) =>
      cancels.push((e as CustomEvent).detail),
    );
    el.addEventListener("minerva-confirm", confirms);
    await userEvent.click(native(cancelButton(el)));
    await settle();
    expect(el.open).toBe(false);
    expect(changes).toEqual([{ open: false, reason: "cancel-button" }]);
    expect(cancels).toEqual([{ reason: "cancel-button" }]);
    expect(confirms).not.toHaveBeenCalled();

    el.open = true;
    await settle();
    await userEvent.click(native(confirmButton(el)));
    await settle();
    expect(confirms).toHaveBeenCalledTimes(1);
    expect(el.open).toBe(false);
    expect(changes.at(-1)).toEqual({ open: false, reason: "confirm" });
    expect(cancels).toHaveLength(1);
  });

  it("a cancelled minerva-confirm keeps the dialog open", async () => {
    const el = await mount<MinervaConfirmDialog>(
      `<minerva-confirm-dialog open label="A"></minerva-confirm-dialog>`,
    );
    el.addEventListener("minerva-confirm", (e) => e.preventDefault());
    await userEvent.click(native(confirmButton(el)));
    await settle();
    expect(el.open).toBe(true);
  });

  it("a cancelled minerva-open-change keeps it open (controlled)", async () => {
    const el = await mount<MinervaConfirmDialog>(
      `<minerva-confirm-dialog open label="A"></minerva-confirm-dialog>`,
    );
    const cancel = vi.fn();
    el.addEventListener("minerva-open-change", (e) => e.preventDefault());
    el.addEventListener("minerva-cancel", cancel);
    await userEvent.keyboard("{Escape}");
    await settle();
    expect(el.open).toBe(true);
    expect(cancel).not.toHaveBeenCalled();
  });

  it("an async onConfirm shows the loading state, then closes (stays open on rejection)", async () => {
    const el = await mount<MinervaConfirmDialog>(
      `<minerva-confirm-dialog open label="A"></minerva-confirm-dialog>`,
    );
    let finish!: () => void;
    let fail!: () => void;
    el.onConfirm = () =>
      new Promise<void>((resolve, reject) => {
        finish = resolve;
        fail = () => reject(new Error("nope"));
      });
    await userEvent.click(native(confirmButton(el)));
    await settle();
    expect(el.open).toBe(true);
    expect(confirmButton(el).loading).toBe(true);
    expect(native(cancelButton(el))).toBeDisabled();
    fail();
    await settle();
    expect(el.open).toBe(true);
    expect(confirmButton(el).loading).toBe(false);

    await userEvent.click(native(confirmButton(el)));
    await settle();
    finish();
    await settle();
    expect(el.open).toBe(false);
  });

  it("closes on an overlay pointer down and with the close button", async () => {
    const el = await mount<MinervaConfirmDialog>(
      `<minerva-confirm-dialog open label="A"></minerva-confirm-dialog>`,
    );
    const reasons: string[] = [];
    el.addEventListener("minerva-cancel", (e) =>
      reasons.push((e as CustomEvent).detail.reason),
    );
    await wait(5); // dismissable layers ignore the opening pointer for one tick
    $(el, "[part=overlay]").dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true, composed: true }),
    );
    await settle();
    expect(el.open).toBe(false);
    el.open = true;
    await settle();
    await userEvent.click($(el, "[part=close-button]"));
    await settle();
    expect(el.open).toBe(false);
    expect(reasons).toEqual(["outside", "close-button"]);
  });

  it("locks scroll, hides the page and registers a modal layer", async () => {
    const el = await mount<MinervaConfirmDialog>(
      `<main id="page">page</main><minerva-confirm-dialog label="A"></minerva-confirm-dialog>`,
      "minerva-confirm-dialog",
    );
    el.show();
    await settle();
    expect(document.getElementById("page")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(document.body.style.overflow).toBe("hidden");
    expect(getLayerStack().at(-1)?.element).toBe(panel(el));
    el.hide();
    await settle();
    await wait(5);
    expect(document.getElementById("page")).not.toHaveAttribute("aria-hidden");
    expect(getLayerStack()).toHaveLength(0);
  });

  it("warns in development when the dialog has no accessible name", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await mount(`<minerva-confirm-dialog open></minerva-confirm-dialog>`);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("<minerva-confirm-dialog>: set `label`"),
    );
  });
});

describe("Confirm keyboard (APG alertdialog)", () => {
  const setup = async () => {
    document.body.innerHTML = `<button id="ask">Delete book</button>`;
    const ask = document.getElementById("ask")!;
    const onResult = vi.fn();
    ask.addEventListener("click", () => {
      void confirm({ title: "Delete book?", color: "danger" }).then(onResult);
    });
    ask.focus();
    await userEvent.keyboard("{Enter}");
    const el = await current();
    return { ask, onResult, el };
  };

  it("focuses Cancel (the least destructive action) first and traps Tab / Shift+Tab", async () => {
    const { el } = await setup();
    const cancel = native(cancelButton(el));
    const close = $(el, "[part=close-button]");
    expect(getActiveElement()).toBe(cancel);
    // user-event's Tab order ignores shadow roots: only the trap edges
    // (handled by core's focus scope) are exercised.
    await userEvent.tab({ shift: true });
    expect(getActiveElement()).toBe(close);
    await userEvent.tab();
    expect(getActiveElement()).toBe(cancel);
    await userEvent.keyboard("{Escape}");
    await settle();
  });

  it("Enter on the confirm button resolves true, removes the dialog and returns focus", async () => {
    const { ask, onResult, el } = await setup();
    native(confirmButton(el)).focus();
    await userEvent.keyboard("{Enter}");
    await settle();
    await wait(10);
    expect(onResult).toHaveBeenCalledWith(true);
    expect(onResult).toHaveBeenCalledTimes(1);
    expect(dialogs()).toHaveLength(0);
    expect(getActiveElement()).toBe(ask);
  });

  it("Enter on the initially focused Cancel resolves false", async () => {
    const { onResult } = await setup();
    await userEvent.keyboard("{Enter}");
    await settle();
    await wait(5);
    expect(onResult).toHaveBeenCalledWith(false);
  });

  it("Escape resolves false and returns focus to the invoker", async () => {
    const { ask, onResult } = await setup();
    await userEvent.keyboard("{Escape}");
    await settle();
    await wait(10);
    expect(onResult).toHaveBeenCalledWith(false);
    expect(dialogs()).toHaveLength(0);
    expect(getActiveElement()).toBe(ask);
  });
});

describe("confirm()", () => {
  it("appends a dialog to document.body, resolves true on confirm and removes it", async () => {
    document.body.innerHTML = "";
    const warn = vi.spyOn(console, "error");
    const result = confirm({
      title: "Delete book?",
      description: "This cannot be undone",
      color: "danger",
    });
    const el = await current();
    expect(el.parentElement).toBe(document.body);
    expect(el.open).toBe(true);
    expect(panel(el)).toHaveAttribute("aria-describedby", "description");
    await userEvent.click(native(confirmButton(el)));
    await expect(result).resolves.toBe(true);
    await settle();
    expect(dialogs()).toHaveLength(0);
    expect(warn).not.toHaveBeenCalled();
  });

  it("resolves false on Cancel / Escape / overlay", async () => {
    document.body.innerHTML = "";
    const cancelled = confirm({ title: "Leave page?", cancelLabel: "Stay" });
    let el = await current();
    expect(cancelButton(el).textContent?.trim()).toBe("Stay");
    await userEvent.click(native(cancelButton(el)));
    await expect(cancelled).resolves.toBe(false);

    const escaped = confirm({ title: "Confirm again" });
    await current();
    await userEvent.keyboard("{Escape}");
    await expect(escaped).resolves.toBe(false);

    const outside = confirm({ title: "Third" });
    el = await current();
    await wait(5);
    $(el, "[part=overlay]").dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true, composed: true }),
    );
    await expect(outside).resolves.toBe(false);
    await settle();
    expect(dialogs()).toHaveLength(0);
  });

  it("queues concurrent requests and shows them one at a time in call order", async () => {
    document.body.innerHTML = "";
    const first = confirm({ title: "First" });
    const second = confirm({ title: "Second" });
    let el = await current();
    expect(dialogs()).toHaveLength(1);
    expect(el.label).toBe("First");
    const ok = native(confirmButton(el));
    ok.click();
    ok.click(); // a double click settles once
    await expect(first).resolves.toBe(true);
    await settle();
    el = await current();
    expect(dialogs()).toHaveLength(1);
    expect(el.label).toBe("Second");
    await userEvent.click(native(cancelButton(el)));
    await expect(second).resolves.toBe(false);
  });

  it("resolves false when the page removes the dialog", async () => {
    document.body.innerHTML = "";
    const result = confirm({ title: "Unfinished" });
    await current();
    document.body.innerHTML = "";
    await expect(result).resolves.toBe(false);
    // the queue keeps working
    const next = confirm({ title: "Next" });
    const el = await current();
    await userEvent.click(native(confirmButton(el)));
    await expect(next).resolves.toBe(true);
  });

  it("renders in the given container scope (theme + language)", async () => {
    document.body.innerHTML = `
      <minerva-config locale="en" theme="light">
        <minerva-config id="scope" locale="zh" theme="dark">
          <button id="ask">ask</button>
        </minerva-config>
      </minerva-config>`;
    await settle();
    const scope = document.getElementById("scope")!;
    const scoped = confirm({ title: "Scoped question", container: scope });
    let el = await current();
    expect(el.parentElement).toBe(scope);
    expect(el.closest("[data-theme]")).toHaveAttribute("data-theme", "dark");
    expect(cancelButton(el).textContent?.trim()).toBe("取消");
    expect(confirmButton(el).textContent?.trim()).toBe("确定");
    await userEvent.click(native(confirmButton(el)));
    await expect(scoped).resolves.toBe(true);
    await settle();

    const root = confirm({ title: "Root question" });
    el = await current();
    expect(el.parentElement).toBe(document.body);
    expect(confirmButton(el).textContent?.trim()).toBe("Confirm");
    await userEvent.click(native(cancelButton(el)));
    await expect(root).resolves.toBe(false);
  });

  it("warns and falls back to document.body for a disconnected container", async () => {
    document.body.innerHTML = "";
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const result = confirm({
      title: "Detached",
      container: document.createElement("div"),
    });
    const el = await current();
    expect(el.parentElement).toBe(document.body);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("`container` is not connected"),
    );
    await userEvent.keyboard("{Escape}");
    await expect(result).resolves.toBe(false);
  });

  it("opened from inside a <minerva-modal>: Escape only closes the confirm", async () => {
    document.body.innerHTML = `
      <minerva-modal id="outer" label="Settings" open>
        <button id="reset">Reset</button>
      </minerva-modal>`;
    await settle();
    const modal = document.getElementById("outer") as MinervaModal;
    const reset = document.getElementById("reset")!;
    const result = new Promise<boolean>((resolve) => {
      reset.addEventListener("click", () => {
        void confirm({ title: "Reset settings?" }).then(resolve);
      });
    });
    // The open modal sets `pointer-events: none` on <body> (modal pointer
    // blocking); user-event checks light DOM ancestors only and would refuse
    // to click the button slotted into the panel (clickable in browsers).
    reset.focus();
    reset.click();
    const el = await current();
    expect(getLayerStack().at(-1)?.element).toBe(panel(el));
    await userEvent.keyboard("{Escape}");
    await expect(result).resolves.toBe(false);
    await settle();
    await wait(10);
    expect(modal.open).toBe(true);
    expect(dialogs()).toHaveLength(0);
    expect(getActiveElement()).toBe(reset);
    await userEvent.keyboard("{Escape}");
    await settle();
    expect(modal.open).toBe(false);
  });
});

describe("scoped confirm (the React library's useConfirm / ConfirmProvider)", () => {
  const answer = async (el: MinervaConfirmDialog, ok: boolean) => {
    await userEvent.click(native(ok ? confirmButton(el) : cancelButton(el)));
    await settle();
  };

  it("registers <minerva-confirm-provider> (display: contents)", () => {
    expect(customElements.get("minerva-confirm-provider")).toBe(
      MinervaConfirmProvider,
    );
  });

  it("confirm({ host }) renders in the host's <minerva-config> scope with its language", async () => {
    document.body.innerHTML = `
      <minerva-config id="scope" theme="dark" locale="zh">
        <section><button id="ask">ask</button></section>
      </minerva-config>`;
    await settle();
    const scope = document.getElementById("scope")!;
    const ask = document.getElementById("ask")!;
    expect(confirmScopeOf(ask)).toBe(scope);
    const result = confirm({ title: "Scoped", host: ask });
    const el = await current();
    expect(el.parentElement).toBe(scope);
    expect(el.closest("[data-theme]")).toHaveAttribute("data-theme", "dark");
    expect(cancelButton(el).textContent?.trim()).toBe("取消");
    await answer(el, true);
    await expect(result).resolves.toBe(true);
  });

  it("crosses shadow roots and carries a host language that its scope does not set", async () => {
    document.body.innerHTML = `
      <div id="scope" data-theme="dark">
        <div lang="fr"><div id="shadow-host"></div></div>
      </div>`;
    const shadowHost = document.getElementById("shadow-host")!;
    const inner = document.createElement("button");
    shadowHost.attachShadow({ mode: "open" }).append(inner);
    const result = confirmFor(inner)({ title: "Question" });
    const el = await current();
    expect(el.parentElement).toBe(document.getElementById("scope"));
    expect(el).toHaveAttribute("lang", "fr");
    expect(cancelButton(el).textContent?.trim()).toBe("Annuler");
    await answer(el, false);
    await expect(result).resolves.toBe(false);
  });

  it("without a scope: document.body (root scope); <html> / <body> attributes are the root", async () => {
    document.body.innerHTML = `<button id="ask">ask</button>`;
    document.body.setAttribute("data-theme", "light");
    try {
      const ask = document.getElementById("ask")!;
      expect(confirmScopeOf(ask)).toBeNull();
      const result = confirm({ title: "Root", host: ask });
      const el = await current();
      expect(el.parentElement).toBe(document.body);
      expect(el.hasAttribute("lang")).toBe(false);
      await answer(el, true);
      await expect(result).resolves.toBe(true);
    } finally {
      document.body.removeAttribute("data-theme");
    }
  });

  it("a provider renders confirm() calls in itself; the host's nested scope wins", async () => {
    document.body.innerHTML = `
      <minerva-confirm-provider id="provider">
        <button id="plain">plain</button>
        <minerva-config id="nested" theme="dark"><button id="ask">ask</button></minerva-config>
      </minerva-confirm-provider>`;
    await settle();
    const provider = document.getElementById(
      "provider",
    ) as MinervaConfirmProvider;
    // no host: the latest provider, in its own scope
    let result = confirm({ title: "Provider" });
    let el = await current();
    expect(el.parentElement).toBe(provider);
    await answer(el, true);
    await expect(result).resolves.toBe(true);
    // a host inside a nested scope: the provider's queue, the nested scope
    result = confirm({
      title: "Nested",
      host: document.getElementById("ask"),
    });
    el = await current();
    expect(el.parentElement).toBe(document.getElementById("nested"));
    await answer(el, false);
    await expect(result).resolves.toBe(false);
    // the provider's own confirm method
    result = provider.confirm({ title: "Method" });
    el = await current();
    expect(el.parentElement).toBe(provider);
    await answer(el, true);
    await expect(result).resolves.toBe(true);
  });

  it("the closest provider of the host queues it; one dialog at a time per queue", async () => {
    document.body.innerHTML = `
      <minerva-confirm-provider id="a"><button id="in-a">a</button></minerva-confirm-provider>
      <minerva-confirm-provider id="b"><button id="in-b">b</button></minerva-confirm-provider>`;
    await settle();
    const a = document.getElementById("a")!;
    const first = confirm({
      title: "First",
      host: document.getElementById("in-a"),
    });
    const second = confirmFor(document.getElementById("in-a")!)({
      title: "Second",
    });
    await settle();
    expect(dialogs()).toHaveLength(1);
    expect(dialogs()[0].parentElement).toBe(a);
    expect((dialogs()[0] as MinervaConfirmDialog).label).toBe("First");
    await answer(dialogs()[0] as MinervaConfirmDialog, true);
    await expect(first).resolves.toBe(true);
    await settle();
    await wait(5);
    expect((dialogs()[0] as MinervaConfirmDialog).label).toBe("Second");
    await answer(dialogs()[0] as MinervaConfirmDialog, false);
    await expect(second).resolves.toBe(false);
  });

  it("disconnecting the provider cancels its pending confirmations", async () => {
    document.body.innerHTML = `<minerva-confirm-provider id="p"><button id="in">x</button></minerva-confirm-provider>`;
    await settle();
    const host = document.getElementById("in")!;
    const shown = confirm({ title: "Shown", host });
    const queued = confirm({ title: "Queued", host });
    await settle();
    expect(dialogs()).toHaveLength(1);
    document.getElementById("p")!.remove();
    await expect(shown).resolves.toBe(false);
    await expect(queued).resolves.toBe(false);
    await settle();
    expect(dialogs()).toHaveLength(0);
    // later calls fall back to document.body
    const later = confirm({ title: "Later" });
    const el = await current();
    expect(el.parentElement).toBe(document.body);
    await answer(el, true);
    await expect(later).resolves.toBe(true);
  });

  it("an explicit container still wins over the host scope", async () => {
    document.body.innerHTML = `
      <minerva-config id="scope" theme="dark"><button id="ask">ask</button></minerva-config>
      <div id="target"></div>`;
    await settle();
    const result = confirm({
      title: "Explicit",
      host: document.getElementById("ask"),
      container: document.getElementById("target"),
    });
    const el = await current();
    expect(el.parentElement).toBe(document.getElementById("target"));
    await answer(el, true);
    await expect(result).resolves.toBe(true);
  });
});
