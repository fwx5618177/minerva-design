import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { getActiveElement } from "@minerva/dom";
import { html } from "lit";
import {
  MinervaToastRegion,
  ToastStore,
  createToast,
  toast,
  toastStore,
  type ToastId,
} from "../../elements/toast";
import "../../elements/config";
import "../../elements/modal";
import type { MinervaModal } from "../modal/modal";
import { resetDevWarnings } from "../../internal/dev";
import { mount, settle, wait } from "../../../tests/utils";

afterEach(() => {
  toastStore.reset();
  document.body.innerHTML = "";
  document.documentElement.removeAttribute("lang");
  vi.useRealTimers();
  vi.restoreAllMocks();
  resetDevWarnings();
});

const regionOf = (el: MinervaToastRegion) =>
  el.shadowRoot!.querySelector<HTMLElement>("[role=region]")!;
const toastsOf = (el: MinervaToastRegion) =>
  Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>(".toast"));
const toastOf = (el: MinervaToastRegion, text: string) =>
  toastsOf(el).find((t) => t.textContent?.includes(text))!;
const closeOf = (item: HTMLElement) =>
  item.querySelector<HTMLButtonElement>('[part~="close-button"]')!;
/** The part names of a toast (`toast toast--open toast--color-info`...) */
const partsOf = (item: HTMLElement) =>
  (item.getAttribute("part") ?? "").split(" ");

/** Lit updates are microtasks: works with fake timers too. */
const flush = async () => {
  for (let i = 0; i < 3; i++) {
    await Promise.resolve();
    await Promise.all(
      Array.from(document.querySelectorAll("minerva-toast-region")).map(
        (r) => (r as MinervaToastRegion).updateComplete,
      ),
    );
  }
};

const setup = (attrs = "") =>
  mount<MinervaToastRegion>(
    `<minerva-toast-region ${attrs}></minerva-toast-region>`,
    "minerva-toast-region",
  );

describe("toast region while a modal is open (same as React)", () => {
  it("is hidden from assistive technologies by the modal's hide-others, and exposed again on close", async () => {
    document.body.innerHTML = `<main id="page"><button>Open</button></main>
      <minerva-toast-region></minerva-toast-region>
      <minerva-modal label="Settings">Body</minerva-modal>`;
    await settle();
    const region = document.querySelector<MinervaToastRegion>(
      "minerva-toast-region",
    )!;
    const modal = document.querySelector<MinervaModal>("minerva-modal")!;
    toast.success("Saved", { duration: 0 });
    modal.open = true;
    await settle();
    expect(document.getElementById("page")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(region).toHaveAttribute("aria-hidden", "true");
    expect(modal).not.toHaveAttribute("aria-hidden");
    // still rendered (and announced again once the modal closes)
    expect(toastsOf(region)).toHaveLength(1);
    modal.open = false;
    await settle();
    await wait(50);
    expect(region).not.toHaveAttribute("aria-hidden");
    expect(document.getElementById("page")).not.toHaveAttribute("aria-hidden");
  });

  it("can opt out with data-minerva-keep-visible", async () => {
    document.body.innerHTML = `<minerva-toast-region data-minerva-keep-visible></minerva-toast-region>
      <minerva-modal label="Settings">Body</minerva-modal>`;
    await settle();
    const region = document.querySelector("minerva-toast-region")!;
    const modal = document.querySelector<MinervaModal>("minerva-modal")!;
    modal.open = true;
    await settle();
    expect(region).not.toHaveAttribute("aria-hidden");
    modal.open = false;
    await settle();
  });
});

describe("toast store", () => {
  it("same id replaces; ids auto-increment; shortcuts map to colors / defaults", () => {
    toast.danger("first", { id: "k", duration: 0 });
    toast.danger("second", { id: "k", duration: 0 });
    expect(toastStore.peek()).toHaveLength(1);
    expect(toastStore.peek()[0].title).toBe("second");
    toastStore.reset();
    toast({ title: "plain" });
    toast.success("ok");
    toast.warning("careful");
    toast.danger("bad");
    toast.info("fyi");
    toast.loading("wait");
    expect(toastStore.peek().map((t) => [t.color, t.loading])).toEqual([
      ["info", false],
      ["success", false],
      ["warning", false],
      ["danger", false],
      ["info", false],
      ["info", true],
    ]);
    expect(toastStore.peek()[0].duration).toBe(4000);
    expect(toastStore.peek()[5].duration).toBe(0);
  });

  it("pause / resume continue the countdown where it stopped", () => {
    vi.useFakeTimers();
    toast.info("p", { id: "p", duration: 1000 });
    vi.advanceTimersByTime(600);
    toastStore.pause("p");
    vi.advanceTimersByTime(5000);
    expect(toastStore.peek()[0].state).toBe("open");
    toastStore.resume("p");
    vi.advanceTimersByTime(399);
    expect(toastStore.peek()[0].state).toBe("open");
    vi.advanceTimersByTime(1);
    expect(toastStore.peek()[0].state).toBe("closing");
  });

  it("keeps nothing during SSR but still returns ids (store.ssr semantics)", () => {
    const store = new ToastStore({ isClient: () => false });
    const api = createToast(store);
    expect(api.success("server side", { duration: 1000 })).toBe(1);
    expect(api({ id: "named" })).toBe("named");
    expect(store.peek()).toHaveLength(0);
  });

  it("does not touch the DOM when the API module is imported", async () => {
    vi.resetModules();
    const createElement = vi.spyOn(document, "createElement");
    const appendChild = vi.spyOn(document.body, "appendChild");
    await import("./toast-store");
    expect(createElement).not.toHaveBeenCalled();
    expect(appendChild).not.toHaveBeenCalled();
  });
});

describe("<minerva-toast-region>", () => {
  it("registers the element", () => {
    expect(customElements.get("minerva-toast-region")).toBe(MinervaToastRegion);
  });

  it("renders the React library's structure, classes and labelled region", async () => {
    const el = await setup(`position="bottom-left"`);
    toast.success("Saved", { description: "All good", duration: 3000 });
    await settle();
    const region = regionOf(el);
    expect(region).toHaveAttribute("aria-label", "Notifications (F8)");
    expect(region.classList).toContain("viewport");
    expect(region.classList).toContain("bottom-left");
    expect(region).toHaveAttribute("popover", "manual");
    expect(region).not.toHaveAttribute("tabindex");
    expect(el).not.toHaveAttribute("data-minerva-keep-visible");
    const [item] = toastsOf(el);
    expect(item).toHaveAttribute("role", "status");
    expect(item.classList).toContain("toast");
    expect(item.classList).toContain("success");
    // public item parts (shadow content: no host attribute)
    expect(item).toHaveAttribute(
      "part",
      "toast toast--open toast--color-success",
    );
    expect(item.style.getPropertyValue("--toast-duration")).toBe("3000ms");
    expect(item.querySelector(".title")).toHaveTextContent("Saved");
    expect(item.querySelector(".description")).toHaveTextContent("All good");
    expect(item.querySelector(".icon svg")).not.toBeNull();
    expect(item.querySelector(".icon")).toHaveAttribute("aria-hidden", "true");
    expect(item.querySelector(".progress")).not.toBeNull();
    const close = closeOf(item);
    expect(close).toHaveAttribute("type", "button");
    expect(close).toHaveAttribute("aria-label", "Close");
    expect(close.classList).toContain("close");
  });

  it.each([
    ["info", "status"],
    ["success", "status"],
    ["warning", "status"],
    ["danger", "alert"],
  ] as const)("toast.%s renders with role=%s", async (method, role) => {
    const el = await setup();
    toast[method]("Announced", { duration: 0 });
    await settle();
    const [item] = toastsOf(el);
    expect(item).toHaveAttribute("role", role);
    expect(item.classList).toContain(method);
  });

  it("uses role=alert for danger, hides empty parts and the progress of persistent toasts", async () => {
    const el = await setup();
    toast({ color: "danger", description: "Only description", duration: 0 });
    await settle();
    const [item] = toastsOf(el);
    expect(item).toHaveAttribute("role", "alert");
    expect(item.querySelector(".title")).toBeNull();
    expect(item.querySelector(".progress")).toBeNull();
    expect(item.style.getPropertyValue("--toast-duration")).toBe("");
    expect(regionOf(el).classList).toContain("top-right");
  });

  it("loading toasts are a polite status with a decorative spinner and never auto-close", async () => {
    const el = await setup();
    // fake timers after mounting (mount() waits on a real timeout)
    vi.useFakeTimers();
    toast({ title: "Deleting", color: "danger", loading: true });
    await flush();
    const [item] = toastsOf(el);
    expect(item).toHaveAttribute("role", "status");
    expect(item.classList).toContain("danger");
    expect(partsOf(item)).toContain("toast--loading");
    expect(item.querySelector(".icon .spinner")).not.toBeNull();
    expect(el.shadowRoot!.querySelector("[role=progressbar]")).toBeNull();
    expect(item.querySelector(".progress")).toBeNull();
    vi.advanceTimersByTime(60_000);
    await flush();
    expect(partsOf(item)).toContain("toast--open");
  });

  it("accepts a template / node title, a custom icon, or no icon", async () => {
    const el = await setup();
    const icon = document.createElement("span");
    icon.dataset.testid = "icon";
    toast.success(html`<strong>Bold</strong>`, { icon, duration: 0 });
    toast.info("Plain", { icon: null, duration: 0 });
    await settle();
    expect(toastOf(el, "Bold").querySelector("strong")).not.toBeNull();
    expect(icon.parentElement).toHaveClass("icon");
    expect(toastOf(el, "Plain").querySelector(".icon")).toBeNull();
  });

  it("hides the close button when closable is false", async () => {
    const el = await setup();
    toast.info("No close", { closable: false, duration: 0 });
    await settle();
    expect(toastsOf(el)[0].querySelector("button")).toBeNull();
  });

  it("auto-closes after 4000ms: onClose once, minerva-close then minerva-after-close", async () => {
    const el = await setup();
    // fake timers after mounting (mount() waits on a real timeout)
    vi.useFakeTimers();
    const onClose = vi.fn();
    const events: Array<[string, unknown]> = [];
    el.addEventListener("minerva-close", (e) =>
      events.push(["close", (e as CustomEvent).detail]),
    );
    el.addEventListener("minerva-after-close", (e) =>
      events.push(["after", (e as CustomEvent).detail]),
    );
    const id = toast.info("Bye", { onClose });
    await flush();
    vi.advanceTimersByTime(3999);
    expect(onClose).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    await flush();
    expect(onClose).toHaveBeenCalledExactlyOnceWith(id);
    expect(partsOf(toastsOf(el)[0])).toContain("toast--closed");
    expect(toastsOf(el)[0].querySelector(".progress")).toBeNull();
    vi.advanceTimersByTime(200);
    await flush();
    expect(toastsOf(el)).toHaveLength(0);
    expect(events).toEqual([
      ["close", { id, reason: "timeout" }],
      ["after", { id }],
    ]);
    toast.dismiss(id);
    toast.dismiss();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes with the close button (custom close-label, aria-label on the host)", async () => {
    const el = await setup(`close-label="Dismiss" aria-label="Alerts"`);
    const onClose = vi.fn();
    el.addEventListener("minerva-close", onClose);
    const id = toast.info("Bye", { duration: 0 });
    await settle();
    expect(regionOf(el)).toHaveAttribute("aria-label", "Alerts");
    const close = closeOf(toastsOf(el)[0]);
    expect(close).toHaveAttribute("aria-label", "Dismiss");
    await userEvent.click(close);
    await settle();
    expect(onClose.mock.calls[0][0].detail).toEqual({
      id,
      reason: "close-button",
    });
    expect(partsOf(toastsOf(el)[0])).toContain("toast--closed");
    await wait(250);
    await settle();
    expect(toastsOf(el)).toHaveLength(0);
  });

  it("localizes the labels from lang and <minerva-config locale>", async () => {
    document.documentElement.lang = "zh";
    const el = await setup();
    toast.info("Hi", { duration: 0 });
    await settle();
    expect(closeOf(toastsOf(el)[0])).toHaveAttribute("aria-label", "关闭");
    expect(regionOf(el)).toHaveAttribute("aria-label", "通知（F8）");
    document.documentElement.removeAttribute("lang");
    const scoped = await mount<MinervaToastRegion>(
      `<minerva-config locale="fr"><minerva-toast-region></minerva-toast-region></minerva-config>`,
      "minerva-toast-region",
    );
    toast.info("Salut", { duration: 0 });
    await settle();
    expect(closeOf(toastsOf(scoped)[0]).getAttribute("aria-label")).not.toBe(
      "Close",
    );
  });

  it("pauses the timer on hover / focus and resumes on leave / blur", async () => {
    const el = await setup();
    // fake timers after mounting (mount() waits on a real timeout)
    vi.useFakeTimers();
    toast.info("Hover", { duration: 1000 });
    await flush();
    const [item] = toastsOf(el);
    item.dispatchEvent(new MouseEvent("mouseenter"));
    vi.advanceTimersByTime(2000);
    await flush();
    expect(partsOf(item)).toContain("toast--open");
    item.dispatchEvent(new MouseEvent("mouseleave"));
    const close = closeOf(item);
    close.focus();
    vi.advanceTimersByTime(2000);
    await flush();
    expect(partsOf(item)).toContain("toast--open");
    // focus moving inside the toast keeps it paused
    close.dispatchEvent(
      new FocusEvent("focusout", {
        bubbles: true,
        composed: true,
        relatedTarget: item,
      }),
    );
    vi.advanceTimersByTime(2000);
    await flush();
    expect(partsOf(item)).toContain("toast--open");
    close.blur();
    vi.advanceTimersByTime(1000);
    await flush();
    expect(partsOf(item)).toContain("toast--closed");
  });

  it("does not pause with no-pause-on-hover", async () => {
    const el = await setup("no-pause-on-hover");
    // fake timers after mounting (mount() waits on a real timeout)
    vi.useFakeTimers();
    toast.info("No pause", { duration: 500 });
    await flush();
    const [item] = toastsOf(el);
    item.dispatchEvent(new MouseEvent("mouseenter"));
    vi.advanceTimersByTime(500);
    await flush();
    expect(partsOf(item)).toContain("toast--closed");
  });

  it("renders an action button that runs and closes the toast", async () => {
    const el = await setup();
    const onClick = vi.fn();
    const onClose = vi.fn();
    el.addEventListener("minerva-close", onClose);
    toast.info("Message archived", {
      duration: 0,
      action: { label: "Undo", onClick },
    });
    await settle();
    const action = toastsOf(el)[0].querySelector<HTMLButtonElement>(".action")!;
    expect(action).toHaveTextContent("Undo");
    expect(action).toHaveAttribute("type", "button");
    action.focus();
    await userEvent.keyboard("{Enter}");
    await settle();
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClose.mock.calls[0][0].detail.reason).toBe("action");
    expect(partsOf(toastsOf(el)[0])).toContain("toast--closed");
  });

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])("closes with %s on the close button", async (_, key) => {
    const el = await setup();
    const onClose = vi.fn();
    const id = toast.success("Saved", { duration: 0, onClose });
    await settle();
    closeOf(toastsOf(el)[0]).focus();
    await userEvent.keyboard(key);
    await settle();
    expect(onClose).toHaveBeenCalledExactlyOnceWith(id);
    expect(partsOf(toastsOf(el)[0])).toContain("toast--closed");
  });

  it("dismiss(id) closes one toast, dismiss() every one", async () => {
    const el = await setup();
    // fake timers after mounting (mount() waits on a real timeout)
    vi.useFakeTimers();
    const onCloseA = vi.fn();
    const onCloseB = vi.fn();
    const a = toast.info("A", { duration: 1000, onClose: onCloseA });
    const b = toast.info("B", { duration: 0, onClose: onCloseB });
    toast.dismiss(a);
    toast.dismiss("missing");
    expect(onCloseA).toHaveBeenCalledExactlyOnceWith(a);
    expect(onCloseB).not.toHaveBeenCalled();
    toast.dismiss();
    expect(onCloseB).toHaveBeenCalledExactlyOnceWith(b);
    vi.advanceTimersByTime(200);
    await flush();
    expect(vi.getTimerCount()).toBe(0);
    expect(toastsOf(el)).toHaveLength(0);
    toast.info("After", { duration: 0 });
    await flush();
    expect(toastsOf(el)[0]).toHaveTextContent("After");
  });

  it("update() changes a toast in place; loading turns into an auto-closing success", async () => {
    const el = await setup();
    // fake timers after mounting (mount() waits on a real timeout)
    vi.useFakeTimers();
    const onClose = vi.fn();
    const id = toast.loading("Saving", { onClose });
    await flush();
    const [item] = toastsOf(el);
    toast.update(id, { title: "Still saving", color: "success" });
    await flush();
    expect(partsOf(item)).toContain("toast--loading");
    vi.advanceTimersByTime(10_000);
    toast.update(id, { title: "Saved", loading: false });
    await flush();
    expect(toastsOf(el)[0]).toBe(item);
    expect(item).toHaveTextContent("Saved");
    expect(item.classList).toContain("success");
    expect(partsOf(item)).not.toContain("toast--loading");
    expect(item.querySelector(".icon .spinner")).toBeNull();
    vi.advanceTimersByTime(4000);
    expect(onClose).toHaveBeenCalledExactlyOnceWith(id);
  });

  it("toast.promise follows a promise from loading to success", async () => {
    const el = await setup();
    let resolve: (value: number) => void = () => undefined;
    const pending = new Promise<number>((r) => {
      resolve = r;
    });
    const returned = toast.promise(pending, {
      loading: "Uploading",
      success: (count) => `Uploaded ${count} files`,
      error: "Upload failed",
    });
    expect(returned).toBe(pending);
    await settle();
    expect(partsOf(toastsOf(el)[0])).toContain("toast--loading");
    expect(toastsOf(el)[0]).toHaveTextContent("Uploading");
    resolve(3);
    await pending;
    await settle();
    expect(toastsOf(el)[0].classList).toContain("success");
    expect(toastsOf(el)[0]).toHaveTextContent("Uploaded 3 files");
    expect(toastStore.peek()).toHaveLength(1);
  });

  it("toast.promise shows a danger toast when the promise rejects", async () => {
    const el = await setup();
    const failing = Promise.reject(new Error("Network down"));
    await toast
      .promise(
        failing,
        {
          loading: "Uploading",
          success: "Uploaded",
          error: (error) => `Failed: ${(error as Error).message}`,
        },
        { id: "upload", duration: 0 },
      )
      .catch(() => undefined);
    await settle();
    const [item] = toastsOf(el);
    expect(item).toHaveAttribute("role", "alert");
    expect(item).toHaveTextContent("Failed: Network down");
    expect(toastStore.peek().map((t) => t.id)).toEqual(["upload"]);
  });

  it("keeps at most max toasts, closing the oldest first", async () => {
    const el = await setup(`max="2"`);
    // fake timers after mounting (mount() waits on a real timeout)
    vi.useFakeTimers();
    const onClose = vi.fn();
    const first = toast.info("1", { duration: 0, onClose });
    toast.info("2", { duration: 0 });
    toast.danger("3", { duration: 0 });
    await flush();
    expect(onClose).toHaveBeenCalledExactlyOnceWith(first);
    vi.advanceTimersByTime(200);
    await flush();
    expect(
      toastsOf(el).map((t) => t.querySelector(".title")?.textContent),
    ).toEqual(["2", "3"]);
  });

  it.each([
    "top-right",
    "top-left",
    "top-center",
    "bottom-right",
    "bottom-left",
    "bottom-center",
  ])("stacks toasts at %s", async (position) => {
    const el = await setup(`position="${position}"`);
    toast.info("Placed", { duration: 0 });
    await settle();
    expect(regionOf(el).classList).toContain(position);
    expect(el.position).toBe(position);
    expect(toastsOf(el)).toHaveLength(1);
  });
});

describe("<minerva-toast-region> keyboard and focus", () => {
  it("does not steal focus when a toast appears", async () => {
    document.body.innerHTML = `<input aria-label="Search" /><minerva-toast-region></minerva-toast-region>`;
    await settle();
    const input = document.querySelector("input")!;
    await userEvent.click(input);
    await userEvent.keyboard("ab");
    toast.danger("Failed", { duration: 0 });
    await settle();
    expect(document.activeElement).toBe(input);
    await userEvent.keyboard("c");
    expect(input.value).toBe("abc");
  });

  it("moves focus to the next toast's close button after closing one", async () => {
    const el = await setup();
    toast.info("First", { duration: 0 });
    toast.info("Second", { duration: 0 });
    await settle();
    closeOf(toastOf(el, "First")).focus();
    await userEvent.keyboard("{Enter}");
    await settle();
    expect(partsOf(toastOf(el, "First"))).toContain("toast--closed");
    expect(getActiveElement()).toBe(closeOf(toastOf(el, "Second")));
  });

  it("dismisses only the focused toast with Escape", async () => {
    const el = await setup();
    const onClose = vi.fn();
    const id = toast.info("First", { duration: 0, onClose });
    toast.info("Second", { duration: 0 });
    await settle();
    closeOf(toastOf(el, "First")).focus();
    await userEvent.keyboard("{Escape}");
    await settle();
    expect(onClose).toHaveBeenCalledExactlyOnceWith(id);
    expect(partsOf(toastOf(el, "Second"))).toContain("toast--open");
    expect(getActiveElement()).toBe(closeOf(toastOf(el, "Second")));
  });

  it("returns focus to the element focused before entering the region", async () => {
    document.body.innerHTML = `<button id="save">Save</button><minerva-toast-region></minerva-toast-region>`;
    await settle();
    const el = document.querySelector("minerva-toast-region")!;
    toast.info("Saved", {
      duration: 0,
      action: { label: "Undo", onClick: () => {} },
    });
    await settle();
    const save = document.getElementById("save")!;
    save.focus();
    const undo = toastsOf(el)[0].querySelector<HTMLElement>(".action")!;
    undo.focus();
    await userEvent.click(undo);
    await settle();
    expect(getActiveElement()).toBe(save);
  });

  it("never drops focus to body when nothing else can take it", async () => {
    const el = await setup();
    toast.info("Alone", { duration: 0 });
    await settle();
    closeOf(toastsOf(el)[0]).focus();
    await userEvent.keyboard(" ");
    await settle();
    expect(getActiveElement()).toBe(regionOf(el));
  });

  it("focuses the region with F8, labels it with the hotkey and gives focus back", async () => {
    document.body.innerHTML = `<input aria-label="Search" /><minerva-toast-region></minerva-toast-region>`;
    await settle();
    const el = document.querySelector("minerva-toast-region")!;
    toast.info("Synced", { duration: 0 });
    await settle();
    const region = regionOf(el);
    const input = document.querySelector("input")!;
    await userEvent.click(input);
    await userEvent.keyboard("{F8}");
    expect(getActiveElement()).toBe(region);
    expect(region).toHaveAttribute("tabindex", "-1");
    closeOf(toastsOf(el)[0]).focus();
    await userEvent.keyboard("{Escape}");
    await settle();
    expect(document.activeElement).toBe(input);
    expect(region).not.toHaveAttribute("tabindex");
  });

  it("does nothing on the hotkey while there is no toast", async () => {
    document.body.innerHTML = `<input aria-label="Search" /><minerva-toast-region></minerva-toast-region>`;
    await settle();
    const input = document.querySelector("input")!;
    await userEvent.click(input);
    await userEvent.keyboard("{F8}");
    expect(document.activeElement).toBe(input);
  });

  it("supports a custom hotkey combination, shown in the label", async () => {
    const el = await setup(`hotkey="altKey KeyT"`);
    toast.info("Custom", { duration: 0 });
    await settle();
    const region = regionOf(el);
    expect(region).toHaveAttribute("aria-label", "Notifications (Alt+T)");
    await userEvent.keyboard("{F8}");
    expect(getActiveElement()).not.toBe(region);
    await userEvent.keyboard("{Alt>}t{/Alt}");
    expect(getActiveElement()).toBe(region);
  });

  it("uses the plain label and disables the hotkey with an empty value", async () => {
    const el = await setup(`hotkey=""`);
    toast.info("Quiet", { duration: 0 });
    await settle();
    const region = regionOf(el);
    expect(region).toHaveAttribute("aria-label", "Notifications");
    await userEvent.keyboard("{F8}");
    expect(getActiveElement()).not.toBe(region);
  });
});

describe("several regions and scopes", () => {
  it("renders each toast once, in the first region; hands over when it goes away", async () => {
    document.body.innerHTML = `
      <minerva-toast-region id="first" aria-label="First"></minerva-toast-region>
      <minerva-toast-region id="second" aria-label="Second"></minerva-toast-region>`;
    await settle();
    const first = document.getElementById("first") as MinervaToastRegion;
    const second = document.getElementById("second") as MinervaToastRegion;
    toast.warning("Still here", { duration: 0 });
    await settle();
    expect(toastsOf(first)).toHaveLength(1);
    expect(toastsOf(second)).toHaveLength(0);
    first.remove();
    await settle();
    expect(toastsOf(second)).toHaveLength(1);
    expect(toastsOf(second)[0]).toHaveTextContent("Still here");
  });

  it("targets a region with toast.region(el), { region: id } or el.toast", async () => {
    document.body.innerHTML = `
      <minerva-toast-region id="main"></minerva-toast-region>
      <minerva-toast-region id="side" position="bottom-left"></minerva-toast-region>`;
    await settle();
    const main = document.getElementById("main") as MinervaToastRegion;
    const side = document.getElementById("side") as MinervaToastRegion;
    toast.region(side).info("Bound", { duration: 0 });
    toast.info("By id", { duration: 0, region: "side" });
    side.toast.success("Property", { duration: 0 });
    toast.info("Default", { duration: 0 });
    await settle();
    expect(toastsOf(side).map((t) => t.textContent?.trim())).toEqual([
      "Bound",
      "By id",
      "Property",
    ]);
    expect(toastsOf(main)).toHaveLength(1);
    const targets: EventTarget[] = [];
    const onClose = (e: Event) => targets.push(e.currentTarget!);
    side.addEventListener("minerva-close", onClose);
    main.addEventListener("minerva-close", onClose);
    toast.dismiss(toastStore.peek()[0].id);
    expect(targets).toEqual([side]);
  });

  it("a region in a <minerva-config> scope keeps its theme and language (toast() stays at the root)", async () => {
    document.body.innerHTML = `
      <minerva-toast-region id="root"></minerva-toast-region>
      <minerva-config theme="dark" locale="zh">
        <minerva-toast-region id="scoped"></minerva-toast-region>
      </minerva-config>`;
    await settle();
    const root = document.getElementById("root") as MinervaToastRegion;
    const scoped = document.getElementById("scoped") as MinervaToastRegion;
    const id = toast.region(scoped).loading("Uploading");
    toast.success("Root saved", { duration: 0 });
    await settle();
    expect(scoped.closest("minerva-config")).toHaveAttribute(
      "data-theme",
      "dark",
    );
    expect(regionOf(scoped)).toHaveAttribute("aria-label", "通知（F8）");
    expect(regionOf(root)).toHaveAttribute("aria-label", "Notifications (F8)");
    expect(closeOf(toastOf(root, "Root saved"))).toHaveAttribute(
      "aria-label",
      "Close",
    );
    expect(regionOf(root).className).toBe(regionOf(scoped).className);
    toast.update(id, { title: "Uploaded", loading: false });
    await settle();
    const item = toastOf(scoped, "Uploaded");
    expect(closeOf(item)).toHaveAttribute("aria-label", "关闭");
    expect(toastsOf(root)).toHaveLength(1);
  });

  it("an explicit close-label wins in a scoped region", async () => {
    document.body.innerHTML = `<minerva-config locale="zh"><minerva-toast-region close-label="Dismiss"></minerva-toast-region></minerva-config>`;
    await settle();
    const el = document.querySelector("minerva-toast-region")!;
    toast.info("Hi", { duration: 0 });
    await settle();
    expect(closeOf(toastsOf(el)[0])).toHaveAttribute("aria-label", "Dismiss");
  });

  it("creates a region on <body> when none exists, removed once a page region connects", async () => {
    toast.info("Queued", { duration: 0 });
    await settle();
    const auto = document.querySelector<MinervaToastRegion>(
      "minerva-toast-region[data-minerva-auto]",
    )!;
    expect(auto).not.toBeNull();
    expect(auto.parentElement).toBe(document.body);
    expect(toastsOf(auto)[0]).toHaveTextContent("Queued");
    const page = document.createElement("minerva-toast-region");
    document.body.prepend(page);
    await settle();
    expect(auto.isConnected).toBe(false);
    expect(toastsOf(page)[0]).toHaveTextContent("Queued");
  });

  it("queues toasts shown before a region connects", async () => {
    // a region present in the same task wins over the automatic one
    toast.info("Early", { duration: 0 });
    document.body.innerHTML = `<minerva-toast-region></minerva-toast-region>`;
    await settle();
    expect(document.querySelectorAll("minerva-toast-region")).toHaveLength(1);
    const el = document.querySelector("minerva-toast-region")!;
    expect(toastsOf(el)[0]).toHaveTextContent("Early");
  });
});

describe("dev warnings", () => {
  it("warns about an invalid position and an unknown region id", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await setup(`position="middle"`);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('invalid position "middle"'),
    );
    // falls back to the default stack
    expect(regionOf(el).classList).toContain("top-right");
    const id: ToastId = toast.info("Lost", { duration: 0, region: "nope" });
    await settle();
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('no element with id "nope"'),
    );
    expect(toastsOf(el)[0]).toHaveTextContent("Lost");
    expect(id).toBe(toastStore.peek()[0].id);
  });
});
