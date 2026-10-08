// Store tests (same-id replacement semantics), plus rendering / provider tests
// (port of the React Toast.test.tsx).
import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref, type VNodeChild } from "vue";
import { flushPromises, mount } from "@vue/test-utils";
import { screen, within } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { renderToString } from "vue/server-renderer";
import { createSSRApp } from "vue";
import ToastProviderDefault, { ToastProvider, toast, useToast } from ".";
import { toastStore as store } from "./store";
import { setLanguage } from "../../config/i18n";
import { Modal } from "../Modal";

afterEach(() => {
  store.reset();
  vi.useRealTimers();
});

const flush = async () => {
  await nextTick();
  await nextTick();
};

/** Mounts a ToastProvider (attached to the document) and waits for its viewport */
const renderProvider = async (
  props: Record<string, unknown> = {},
  slot?: () => VNodeChild,
) => {
  const wrapper = mount(ToastProvider, {
    props,
    slots: slot ? { default: slot } : undefined,
    attachTo: document.body,
  });
  await flush();
  return wrapper;
};

const show = async <T>(fn: () => T): Promise<T> => {
  const result = fn();
  await flush();
  return result;
};

const advance = async (ms: number) => {
  vi.advanceTimersByTime(ms);
  await flush();
};

describe("toast store: same id replaces", () => {
  it("pushing the same id several times keeps one toast with the last content", () => {
    toast.danger("first", { id: "k", duration: 0 });
    toast.danger("second", { id: "k", duration: 0 });
    toast.danger("third", { id: "k", duration: 0 });
    const items = store.peek();
    expect(items).toHaveLength(1);
    expect(items[0]?.id).toBe("k");
    expect(items[0]?.title).toBe("third");
  });

  it("different ids coexist; without id every push adds a toast", () => {
    toast.danger("a", { id: "k1", duration: 0 });
    toast.danger("b", { id: "k2", duration: 0 });
    expect(store.peek().map((t) => t.id)).toEqual(["k1", "k2"]);
    toast.info("c", { duration: 0 });
    toast.info("d", { duration: 0 });
    expect(store.peek()).toHaveLength(4);
  });

  it("a replacing push resets the auto-close timer", async () => {
    toast.danger("first", { id: "k", duration: 30 });
    await new Promise((r) => setTimeout(r, 10));
    toast.danger("second", { id: "k", duration: 30 });
    await new Promise((r) => setTimeout(r, 25));
    expect(store.peek()).toHaveLength(1);
    expect(store.peek()[0]?.title).toBe("second");
  });

  it("maps shortcuts to colors and defaults to info / not loading / 4000ms", () => {
    toast({ title: "plain" });
    toast.success("ok");
    toast.warning("careful");
    toast.danger("bad");
    toast.info("fyi");
    toast.loading("wait");
    toast.loading("wait", { color: "warning" });
    expect(store.peek().map((t) => [t.color, t.loading])).toEqual([
      ["info", false],
      ["success", false],
      ["warning", false],
      ["danger", false],
      ["info", false],
      ["info", true],
      ["warning", true],
    ]);
    expect(store.peek()[0]?.duration).toBe(4000);
    expect(store.peek()[5]?.duration).toBe(0);
  });

  it("auto-closes after the duration, then removes after the exit animation", () => {
    vi.useFakeTimers();
    toast.success("bye", { id: "x", duration: 1000 });
    vi.advanceTimersByTime(999);
    expect(store.peek()[0]?.state).toBe("open");
    vi.advanceTimersByTime(1);
    expect(store.peek()[0]?.state).toBe("closing");
    vi.advanceTimersByTime(200);
    expect(store.peek()).toHaveLength(0);
  });

  it("dismiss(id) closes one toast, dismiss() closes all, unknown ids are ignored", () => {
    vi.useFakeTimers();
    toast.info("a", { id: "a", duration: 0 });
    toast.info("b", { id: "b", duration: 0 });
    toast.info("c", { id: "c", duration: 0 });
    toast.dismiss("a");
    toast.dismiss("missing");
    vi.advanceTimersByTime(200);
    expect(store.peek().map((t) => t.id)).toEqual(["b", "c"]);
    toast.dismiss();
    vi.advanceTimersByTime(200);
    expect(store.peek()).toHaveLength(0);
  });

  it("a toast pushed again while closing is kept", () => {
    vi.useFakeTimers();
    toast.info("a", { id: "a", duration: 0 });
    toast.dismiss("a");
    toast.info("a again", { id: "a", duration: 0 });
    vi.advanceTimersByTime(200);
    expect(store.peek()).toHaveLength(1);
    expect(store.peek()[0]?.title).toBe("a again");
  });

  it("pause / resume continue the countdown where it stopped", () => {
    vi.useFakeTimers();
    toast.info("p", { id: "p", duration: 1000 });
    vi.advanceTimersByTime(600);
    store.pause("p");
    store.pause("p");
    vi.advanceTimersByTime(5000);
    expect(store.peek()[0]?.state).toBe("open");
    store.resume("p");
    store.resume("p");
    vi.advanceTimersByTime(399);
    expect(store.peek()[0]?.state).toBe("open");
    vi.advanceTimersByTime(1);
    expect(store.peek()[0]?.state).toBe("closing");
  });

  it("works without a provider and unsubscribes listeners", () => {
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);
    expect(() => toast.success("no provider")).not.toThrow();
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
    toast.success("again");
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe("ToastProvider", () => {
  it("is the default export too; useToast returns the toast function outside a scope", () => {
    expect(ToastProviderDefault).toBe(ToastProvider);
    let api: unknown;
    mount(
      defineComponent({
        setup() {
          api = useToast();
          return () => null;
        },
      }),
    );
    expect(api).toBe(toast);
  });

  it("renders toasts in a labelled region with color and position classes", async () => {
    await renderProvider({ position: "bottom-left" }, () => h("p", "App"));
    expect(screen.getByText("App")).toBeInTheDocument();
    await show(() =>
      toast.success("Saved", { description: "All good", duration: 3000 }),
    );
    const region = screen.getByRole("region", { name: "Notifications (F8)" });
    expect(region).toHaveClass("viewport", "bottom-left");
    expect(region).toHaveAttribute("data-minerva", "toast-region");
    expect(region).toHaveAttribute("data-part", "root");
    const item = within(region).getByRole("status");
    expect(item).toHaveClass("toast", "success");
    expect(item).toHaveAttribute("data-minerva", "toast-region");
    expect(item).toHaveAttribute("data-part", "toast");
    expect(item).toHaveAttribute("data-state", "open");
    expect(item).toHaveAttribute("data-color", "success");
    expect(item).not.toHaveAttribute("data-loading");
    expect(item.style.getPropertyValue("--toast-duration")).toBe("3000ms");
    expect(item.querySelector(".title")).toHaveTextContent("Saved");
    expect(item.querySelector(".description")).toHaveTextContent("All good");
    expect(item.querySelector(".icon svg")).not.toBeNull();
    expect(item.querySelector(".progress")).not.toBeNull();
  });

  it("uses role=alert for danger, hides empty parts and the progress of persistent toasts", async () => {
    await renderProvider();
    await show(() =>
      toast({ color: "danger", description: "Only description", duration: 0 }),
    );
    const alert = screen.getByRole("alert");
    expect(alert.querySelector(".title")).toBeNull();
    expect(alert.querySelector(".progress")).toBeNull();
    expect(alert.style.getPropertyValue("--toast-duration")).toBe("");
    expect(
      screen.getByRole("region", { name: "Notifications (F8)" }),
    ).toHaveClass("viewport", "top-right");
  });

  it("closes with the close button", async () => {
    vi.useFakeTimers();
    await renderProvider({ closeLabel: "Dismiss", "aria-label": "Alerts" });
    await show(() => toast.info("Bye", { duration: 0 }));
    const region = screen.getByRole("region", { name: "Alerts" });
    within(region).getByRole("button", { name: "Dismiss" }).click();
    await flush();
    expect(within(region).getByRole("status")).toHaveAttribute(
      "data-state",
      "closed",
    );
    await advance(200);
    expect(within(region).queryByRole("status")).toBeNull();
  });

  it("pauses the timer on hover / focus and resumes on leave / blur", async () => {
    vi.useFakeTimers();
    await renderProvider();
    await show(() => toast.info("Hover", { duration: 1000 }));
    const item = screen.getByRole("status");
    item.dispatchEvent(new MouseEvent("mouseenter"));
    await advance(2000);
    expect(item).toHaveAttribute("data-state", "open");
    item.dispatchEvent(new MouseEvent("mouseleave"));
    const close = within(item).getByRole("button");
    close.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    await advance(2000);
    expect(item).toHaveAttribute("data-state", "open");
    // focus moving inside the toast keeps it paused
    close.dispatchEvent(
      new FocusEvent("focusout", { bubbles: true, relatedTarget: item }),
    );
    await advance(2000);
    expect(item).toHaveAttribute("data-state", "open");
    close.dispatchEvent(
      new FocusEvent("focusout", { bubbles: true, relatedTarget: null }),
    );
    await advance(1000);
    expect(item).toHaveAttribute("data-state", "closed");
  });

  it("does not pause when pauseOnHover is false", async () => {
    vi.useFakeTimers();
    await renderProvider({ pauseOnHover: false });
    await show(() => toast.info("No pause", { duration: 500 }));
    const item = screen.getByRole("status");
    item.dispatchEvent(new MouseEvent("mouseenter"));
    await advance(500);
    expect(item).toHaveAttribute("data-state", "closed");
    item.dispatchEvent(new MouseEvent("mouseleave"));
  });

  it("renders nothing but its content on the server", async () => {
    toast.info("server", { duration: 0 });
    const html = await renderToString(
      createSSRApp({
        render: () => h(ToastProvider, null, () => h("span", "content")),
      }),
    );
    expect(html).toContain("content");
    expect(html).not.toContain("viewport");
    expect(html).not.toContain("server");
  });

  it("is hidden from assistive technologies by an open modal's hide-others, and exposed again on close", async () => {
    const open = ref(false);
    mount(
      defineComponent({
        setup: () => () =>
          h(ToastProvider, null, () =>
            h(Modal, { open: open.value, title: "Settings" }, () => "Body"),
          ),
      }),
      { attachTo: document.body },
    );
    await flush();
    await show(() => toast.success("Saved", { duration: 0 }));
    const viewport = screen.getByRole("region", { name: /Notifications/ });
    expect(viewport).not.toHaveAttribute("aria-hidden");
    open.value = true;
    await flushPromises();
    await flush();
    expect(viewport).toHaveAttribute("aria-hidden", "true");
    expect(viewport.querySelector('[role="status"]')).not.toBeNull();
    open.value = false;
    await flushPromises();
    await flush();
    expect(viewport).not.toHaveAttribute("aria-hidden");
  });
});

describe("toast: loading, update, promise, max and options", () => {
  const setupUser = () =>
    userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

  afterEach(() => {
    setLanguage("en");
  });

  it.each([
    ["info", "status"],
    ["success", "status"],
    ["warning", "status"],
    ["danger", "alert"],
  ] as const)("toast.%s renders with role=%s", async (method, role) => {
    await renderProvider();
    await show(() => toast[method]("Announced", { duration: 0 }));
    const item = screen.getByRole(role);
    expect(item).toHaveTextContent("Announced");
    expect(item).toHaveClass(method);
  });

  it("a loading toast is a polite status whatever its color", async () => {
    await renderProvider();
    await show(() =>
      toast({ title: "Deleting", color: "danger", loading: true }),
    );
    const item = screen.getByRole("status");
    expect(item).toHaveClass("danger");
    expect(item).toHaveAttribute("data-loading", "");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("toast.loading shows a decorative spinner and never auto-closes", async () => {
    vi.useFakeTimers();
    await renderProvider();
    await show(() => toast.loading("Saving…"));
    const item = screen.getByRole("status");
    expect(item).toHaveClass("info");
    expect(item).toHaveAttribute("data-loading", "");
    const spinner = item.querySelector(".icon .spinner");
    expect(spinner).not.toBeNull();
    expect(spinner).toHaveClass("small");
    expect(spinner?.parentElement).toHaveAttribute("aria-hidden", "true");
    expect(spinner?.parentElement).toHaveAttribute("data-minerva", "progress");
    // The toast itself is the live region: the spinner is not a progressbar
    expect(screen.queryByRole("progressbar")).toBeNull();
    expect(item.querySelector(".progress")).toBeNull();
    await advance(60_000);
    expect(item).toHaveAttribute("data-state", "open");
  });

  it("accepts a VNode title, a render function, a custom icon, or no icon", async () => {
    await renderProvider();
    await show(() =>
      toast.success(h("strong", "Bold"), {
        description: () => h("em", "Rendered"),
        icon: h("span", { "data-testid": "icon" }),
        duration: 0,
      }),
    );
    expect(screen.getByText("Bold").tagName).toBe("STRONG");
    expect(screen.getByText("Rendered").tagName).toBe("EM");
    const icon = screen.getByTestId("icon");
    expect(icon.parentElement).toHaveClass("icon");
    expect(icon.parentElement).toHaveAttribute("aria-hidden", "true");

    await show(() =>
      toast.info("Plain", { id: "plain", icon: null, duration: 0 }),
    );
    expect(
      screen.getByText("Plain").closest(".toast")!.querySelector(".icon"),
    ).toBeNull();
  });

  it("hides the close button when closable is false", async () => {
    await renderProvider();
    await show(() => toast.info("No close", { closable: false, duration: 0 }));
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("auto-closes after the default 4000ms and calls onClose once with the id", async () => {
    vi.useFakeTimers();
    await renderProvider();
    const onClose = vi.fn();
    const id = await show(() => toast.info("Bye", { onClose }));
    await advance(3999);
    expect(onClose).not.toHaveBeenCalled();
    await advance(1);
    expect(onClose).toHaveBeenCalledExactlyOnceWith(id);
    await advance(200);
    expect(screen.queryByRole("status")).toBeNull();
    // Later dismissals do not call it again
    toast.dismiss(id);
    toast.dismiss();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes via a labelled close button that does not submit forms, calling onClose", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = setupUser();
    const onSubmit = vi.fn((e: Event) => e.preventDefault());
    const onClose = vi.fn();
    mount(
      defineComponent({
        setup: () => () =>
          h("form", { onSubmit }, [
            h(ToastProvider, { closeLabel: "Dismiss" }),
          ]),
      }),
      { attachTo: document.body },
    );
    await flush();
    const id = await show(() =>
      toast.danger("Closable", { duration: 0, onClose }),
    );
    const close = screen.getByRole("button", { name: "Dismiss" });
    expect(close).toHaveAttribute("type", "button");
    await user.click(close);
    expect(onClose).toHaveBeenCalledExactlyOnceWith(id);
    expect(onSubmit).not.toHaveBeenCalled();
    await advance(200);
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("renders an action button that is keyboard operable and closes the toast", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = setupUser();
    const onClick = vi.fn();
    await renderProvider();
    await show(() =>
      toast.info("Message archived", {
        duration: 0,
        action: { label: "Undo", onClick },
      }),
    );
    const action = screen.getByRole("button", { name: "Undo" });
    expect(action).toHaveAttribute("type", "button");
    expect(action).toHaveAttribute("data-part", "action");
    await user.tab();
    expect(action).toHaveFocus();
    await user.keyboard("{Enter}");
    await flush();
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "closed");
  });

  it("pauses while hovered and resumes the remaining time afterwards", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = setupUser();
    const onClose = vi.fn();
    await renderProvider();
    await show(() => toast.info("Hover", { duration: 1000, onClose }));
    const item = screen.getByRole("status");
    await advance(400);
    await user.hover(item);
    await advance(3000);
    expect(onClose).not.toHaveBeenCalled();
    await user.unhover(item);
    // Only the remaining ~600ms are needed, not a fresh 1000ms
    await advance(700);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("pauses while keyboard focus is inside the toast", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = setupUser();
    const onClose = vi.fn();
    await renderProvider();
    await show(() => toast.info("Focus", { duration: 1000, onClose }));
    await advance(300);
    await user.tab();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    await advance(3000);
    expect(onClose).not.toHaveBeenCalled();
    screen.getByRole("button", { name: "Close" }).blur();
    await advance(800);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("dismiss(id) closes only that toast; dismiss() calls every onClose and clears timers", async () => {
    vi.useFakeTimers();
    await renderProvider();
    const onCloseA = vi.fn();
    const onCloseB = vi.fn();
    const onCloseC = vi.fn();
    const a = await show(() =>
      toast.info("A", { duration: 1000, onClose: onCloseA }),
    );
    const b = await show(() =>
      toast.info("B", { duration: 2000, onClose: onCloseB }),
    );
    const c = await show(() =>
      toast.info("C", { duration: 0, onClose: onCloseC }),
    );
    toast.dismiss(a);
    expect(onCloseA).toHaveBeenCalledExactlyOnceWith(a);
    expect(onCloseB).not.toHaveBeenCalled();
    toast.dismiss();
    expect(onCloseB).toHaveBeenCalledExactlyOnceWith(b);
    expect(onCloseC).toHaveBeenCalledExactlyOnceWith(c);
    await advance(200);
    expect(vi.getTimerCount()).toBe(0);
    expect(screen.queryAllByRole("status")).toHaveLength(0);
    await show(() => toast.info("After", { duration: 0 }));
    expect(screen.getByRole("status")).toHaveTextContent("After");
  });

  it("update() changes a toast in place; loading turns into an auto-closing success", async () => {
    vi.useFakeTimers();
    await renderProvider();
    const onClose = vi.fn();
    const id = await show(() => toast.loading("Saving", { onClose }));
    const item = screen.getByRole("status");
    await show(() =>
      toast.update(id, { title: "Still saving", color: "success" }),
    );
    expect(item).toHaveAttribute("data-loading", "");
    await advance(10_000);
    expect(item).toHaveAttribute("data-state", "open");
    await show(() => toast.update(id, { title: "Saved", loading: false }));
    expect(screen.getByRole("status")).toBe(item);
    expect(item).toHaveTextContent("Saved");
    expect(item).toHaveClass("success");
    expect(item).not.toHaveAttribute("data-loading");
    expect(item.querySelector(".icon .spinner")).toBeNull();
    expect(store.peek()).toHaveLength(1);
    await advance(4000);
    expect(onClose).toHaveBeenCalledExactlyOnceWith(id);
  });

  it("update() keeps unspecified options, honours a new duration and ignores unknown ids", async () => {
    vi.useFakeTimers();
    await renderProvider();
    const id = await show(() =>
      toast.warning("Low disk", { description: "2 GB left", duration: 0 }),
    );
    toast.update("missing", { title: "Changed" });
    await show(() =>
      toast.update(id, { description: "1 GB left", duration: 300 }),
    );
    const item = screen.getByRole("status");
    expect(item).toHaveTextContent("Low disk");
    expect(item).toHaveTextContent("1 GB left");
    expect(item).toHaveClass("warning");
    await advance(300);
    expect(item).toHaveAttribute("data-state", "closed");
  });

  it("toast.promise follows a promise from loading to success", async () => {
    vi.useFakeTimers();
    await renderProvider();
    let resolve: (value: number) => void = () => undefined;
    const pending = new Promise<number>((r) => {
      resolve = r;
    });
    const returned = toast.promise(pending, {
      loading: "Uploading",
      success: (count) => `Uploaded ${count} files`,
      error: "Upload failed",
    });
    await flush();
    expect(returned).toBe(pending);
    expect(screen.getByRole("status")).toHaveAttribute("data-loading", "");
    expect(screen.getByRole("status")).toHaveTextContent("Uploading");
    resolve(3);
    await pending;
    await flush();
    expect(screen.getByRole("status")).toHaveClass("success");
    expect(screen.getByRole("status")).not.toHaveAttribute("data-loading");
    expect(screen.getByRole("status")).toHaveTextContent("Uploaded 3 files");
    expect(store.peek()).toHaveLength(1);
    await advance(4000);
    expect(store.peek()[0]?.state).toBe("closing");
  });

  it("toast.promise uses plain messages too", async () => {
    await renderProvider();
    await toast.promise(Promise.resolve(1), {
      loading: "Uploading",
      success: "Uploaded",
      error: "Failed",
    });
    await flush();
    expect(screen.getByRole("status")).toHaveTextContent("Uploaded");
    const failing = Promise.reject(new Error("x"));
    await toast
      .promise(failing, { loading: "L", success: "S", error: "Plain error" })
      .catch(() => undefined);
    await flush();
    expect(screen.getByRole("alert")).toHaveTextContent("Plain error");
  });

  it("toast.promise shows a danger toast when the promise rejects", async () => {
    await renderProvider();
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
    await flush();
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("danger");
    expect(alert).toHaveTextContent("Failed: Network down");
    expect(store.peek().map((t) => t.id)).toEqual(["upload"]);
  });

  it("chains toasts with onClose", async () => {
    vi.useFakeTimers();
    await renderProvider();
    await show(() =>
      toast.loading("Saving", {
        duration: 100,
        onClose: () => toast.success("Saved", { duration: 0 }),
      }),
    );
    expect(screen.getByRole("status")).toHaveTextContent("Saving");
    await advance(100);
    await advance(200);
    expect(screen.getByRole("status")).toHaveTextContent("Saved");
    expect(screen.getByRole("status")).toHaveClass("success");
  });

  it("keeps at most max toasts, closing the oldest first", async () => {
    vi.useFakeTimers();
    await renderProvider({ max: 2 });
    const onClose = vi.fn();
    const first = await show(() => toast.info("1", { duration: 0, onClose }));
    await show(() => toast.info("2", { duration: 0 }));
    await show(() => toast.danger("3", { duration: 0 }));
    expect(onClose).toHaveBeenCalledExactlyOnceWith(first);
    await advance(200);
    expect(
      [...screen.queryAllByRole("status"), ...screen.queryAllByRole("alert")]
        .map((el) => el.querySelector(".title")?.textContent)
        .sort(),
    ).toEqual(["2", "3"]);
  });

  it("applies a lowered max to the toasts already shown", async () => {
    const wrapper = await renderProvider();
    await show(() => {
      toast.info("1", { duration: 0 });
      toast.info("2", { duration: 0 });
    });
    await wrapper.setProps({ max: 1 });
    await flush();
    expect(store.peek().map((t) => t.state)).toEqual(["closing", "open"]);
  });

  it("de-duplicates items sharing an id (the latest wins)", async () => {
    toast.info("A", { id: "dup", duration: 0 });
    const [first] = store.peek();
    vi.spyOn(store, "getSnapshot").mockReturnValue([
      first!,
      { ...first!, title: "B" },
    ]);
    await renderProvider();
    expect(screen.getAllByRole("status")).toHaveLength(1);
    expect(screen.getByRole("status")).toHaveTextContent("B");
    vi.restoreAllMocks();
  });

  it.each([
    "top-right",
    "top-left",
    "top-center",
    "bottom-right",
    "bottom-left",
    "bottom-center",
  ] as const)("stacks toasts at %s", async (position) => {
    await renderProvider({ position });
    await show(() => toast.info("Placed", { duration: 0 }));
    const region = screen.getByRole("region", { name: "Notifications (F8)" });
    expect(region).toHaveClass("viewport", position);
    expect(region).toContainElement(screen.getByRole("status"));
  });

  it("translates the labels and lets closeLabel win", async () => {
    setLanguage("zh");
    const wrapper = await renderProvider();
    await show(() => toast.info("Hi", { duration: 0 }));
    expect(screen.getByRole("button", { name: "关闭" })).toBeInTheDocument();
    expect(screen.getByRole("region")).toHaveAccessibleName("通知（F8）");
    await wrapper.setProps({ closeLabel: "Dismiss" });
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("does not touch the DOM when the module is imported", async () => {
    vi.resetModules();
    const createElement = vi.spyOn(document, "createElement");
    const appendChild = vi.spyOn(document.body, "appendChild");
    await import("./index");
    expect(createElement).not.toHaveBeenCalled();
    expect(appendChild).not.toHaveBeenCalled();
    vi.restoreAllMocks();
  });
});

describe("several ToastProviders", () => {
  const renderTree = async (render: () => VNodeChild) => {
    const wrapper = mount(defineComponent({ setup: () => render }), {
      attachTo: document.body,
    });
    await flush();
    return wrapper;
  };

  it("renders each toast once when two providers are mounted", async () => {
    await renderTree(() => [
      h(ToastProvider, { "aria-label": "First" }),
      h(ToastProvider, { "aria-label": "Second" }),
    ]);
    await show(() => toast.success("Saved once", { duration: 0 }));
    expect(screen.getAllByText("Saved once")).toHaveLength(1);
    expect(screen.getAllByRole("region")).toHaveLength(1);
    expect(
      within(screen.getByRole("region", { name: "First" })).getByText(
        "Saved once",
      ),
    ).toBeInTheDocument();
  });

  it("lets the outermost of nested providers render the toasts", async () => {
    await renderTree(() =>
      h(ToastProvider, { "aria-label": "Outer", position: "bottom-left" }, () =>
        h(ToastProvider, { "aria-label": "Inner", position: "top-center" }),
      ),
    );
    await show(() => toast.info("Nested", { duration: 0 }));
    expect(screen.getAllByText("Nested")).toHaveLength(1);
    expect(screen.getByRole("region", { name: "Outer" })).toHaveClass(
      "bottom-left",
    );
    expect(screen.queryByRole("region", { name: "Inner" })).toBeNull();
  });

  it("hands the toasts over to the remaining provider when the owner unmounts", async () => {
    const first = ref(true);
    await renderTree(() => [
      first.value ? h(ToastProvider, { "aria-label": "First" }) : null,
      h(ToastProvider, { "aria-label": "Second" }),
    ]);
    await show(() => toast.warning("Still here", { duration: 0 }));
    expect(
      within(screen.getByRole("region", { name: "First" })).getByText(
        "Still here",
      ),
    ).toBeInTheDocument();
    first.value = false;
    await flush();
    expect(screen.queryByRole("region", { name: "First" })).toBeNull();
    expect(
      within(screen.getByRole("region", { name: "Second" })).getByText(
        "Still here",
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Still here")).toHaveLength(1);
  });

  it("keeps a provider mounted later from taking over a live owner", async () => {
    const second = ref(false);
    await renderTree(() => [
      h(ToastProvider, { "aria-label": "First" }),
      second.value ? h(ToastProvider, { "aria-label": "Second" }) : null,
    ]);
    second.value = true;
    await flush();
    await show(() => toast.info("Owned", { duration: 0 }));
    expect(
      within(screen.getByRole("region", { name: "First" })).getByText("Owned"),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Owned")).toHaveLength(1);
  });
});
