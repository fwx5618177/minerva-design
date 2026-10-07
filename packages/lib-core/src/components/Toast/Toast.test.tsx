// Store tests (same-id replacement semantics), plus rendering / provider tests.
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ToastProvider, toast, useToast } from ".";
import { toastStore as store } from "./store";
import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type React from "react";
import i18n from "../../config/i18n";
import { ConfigProvider } from "../../contexts/ConfigProvider";
import { Modal } from "../Modal/Modal";

afterEach(() => {
  store.reset();
  vi.useRealTimers();
});

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

  it("different ids coexist", () => {
    toast.danger("a", { id: "k1", duration: 0 });
    toast.danger("b", { id: "k2", duration: 0 });

    const items = store.peek();
    expect(items).toHaveLength(2);
    expect(items.map((t) => t.id)).toEqual(["k1", "k2"]);
  });

  it("without id every push adds a toast with an auto-increment id", () => {
    toast.info("a", { duration: 0 });
    toast.info("b", { duration: 0 });
    toast.info("c", { duration: 0 });

    expect(store.peek()).toHaveLength(3);
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
    act(() => vi.advanceTimersByTime(999));
    expect(store.peek()[0]?.state).toBe("open");
    act(() => vi.advanceTimersByTime(1));
    expect(store.peek()[0]?.state).toBe("closing");
    act(() => vi.advanceTimersByTime(200));
    expect(store.peek()).toHaveLength(0);
  });

  it("dismiss(id) closes one toast, dismiss() closes all, unknown ids are ignored", () => {
    vi.useFakeTimers();
    toast.info("a", { id: "a", duration: 0 });
    toast.info("b", { id: "b", duration: 0 });
    toast.info("c", { id: "c", duration: 0 });
    toast.dismiss("a");
    toast.dismiss("missing");
    act(() => vi.advanceTimersByTime(200));
    expect(store.peek().map((t) => t.id)).toEqual(["b", "c"]);
    toast.dismiss();
    act(() => vi.advanceTimersByTime(200));
    expect(store.peek()).toHaveLength(0);
  });

  it("a toast pushed again while closing is kept", () => {
    vi.useFakeTimers();
    toast.info("a", { id: "a", duration: 0 });
    toast.dismiss("a");
    toast.info("a again", { id: "a", duration: 0 });
    act(() => vi.advanceTimersByTime(200));
    expect(store.peek()).toHaveLength(1);
    expect(store.peek()[0]?.title).toBe("a again");
  });

  it("pause / resume continue the countdown where it stopped", () => {
    vi.useFakeTimers();
    toast.info("p", { id: "p", duration: 1000 });
    act(() => vi.advanceTimersByTime(600));
    store.pause("p");
    store.pause("p");
    act(() => vi.advanceTimersByTime(5000));
    expect(store.peek()[0]?.state).toBe("open");
    store.resume("p");
    store.resume("p");
    act(() => vi.advanceTimersByTime(399));
    expect(store.peek()[0]?.state).toBe("open");
    act(() => vi.advanceTimersByTime(1));
    expect(store.peek()[0]?.state).toBe("closing");
    // no timer for persistent toasts
    toast.info("q", { id: "q", duration: 0 });
    store.pause("q");
    store.resume("q");
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

describe("toast viewport while a modal is open (same as <minerva-toast-region>)", () => {
  it("is hidden from assistive technologies by the modal's hide-others, and exposed again on close", async () => {
    const view = render(
      <ToastProvider>
        <Modal open={false} onOpenChange={() => {}} title="Settings">
          Body
        </Modal>
      </ToastProvider>,
    );
    act(() => {
      toast.success("Saved", { duration: 0 });
    });
    const viewport = screen.getByRole("region", { name: /Notifications/ });
    expect(viewport).not.toHaveAttribute("aria-hidden");
    view.rerender(
      <ToastProvider>
        <Modal open onOpenChange={() => {}} title="Settings">
          Body
        </Modal>
      </ToastProvider>,
    );
    expect(viewport).toHaveAttribute("aria-hidden", "true");
    // still rendered, announced again once the modal closes
    expect(viewport.querySelector('[role="status"]')).not.toBeNull();
    view.rerender(
      <ToastProvider>
        <Modal open={false} onOpenChange={() => {}} title="Settings">
          Body
        </Modal>
      </ToastProvider>,
    );
    expect(viewport).not.toHaveAttribute("aria-hidden");
    view.unmount();
  });
});

describe("ToastProvider", () => {
  it("useToast returns the toast function", () => {
    const { result } = renderHook(() => useToast());
    expect(result.current).toBe(toast);
  });

  it("renders toasts in a labelled region with color and position classes", () => {
    render(
      <ToastProvider position="bottomLeft">
        <p>App</p>
      </ToastProvider>,
    );
    expect(screen.getByText("App")).toBeInTheDocument();
    act(() => {
      toast.success("Saved", { description: "All good", duration: 3000 });
    });
    const region = screen.getByRole("region", { name: "Notifications (F8)" });
    expect(region).toHaveClass("viewport", "bottomLeft");
    const item = within(region).getByRole("status");
    expect(item).toHaveClass("toast", "success");
    expect(item).toHaveAttribute("data-state", "open");
    expect(item).not.toHaveAttribute("data-loading");
    expect(item.style.getPropertyValue("--toast-duration")).toBe("3000ms");
    expect(item.querySelector(".title")).toHaveTextContent("Saved");
    expect(item.querySelector(".description")).toHaveTextContent("All good");
    expect(item.querySelector(".icon svg")).not.toBeNull();
    expect(item.querySelector(".progress")).not.toBeNull();
  });

  it("uses role=alert for danger, hides empty parts and the progress of persistent toasts", () => {
    render(<ToastProvider />);
    act(() => {
      toast({ color: "danger", description: "Only description", duration: 0 });
    });
    const alert = screen.getByRole("alert");
    expect(alert.querySelector(".title")).toBeNull();
    expect(alert.querySelector(".progress")).toBeNull();
    expect(alert.style.getPropertyValue("--toast-duration")).toBe("");
    expect(
      screen.getByRole("region", { name: "Notifications (F8)" }),
    ).toHaveClass("viewport", "topRight");
  });

  it("closes with the close button", () => {
    vi.useFakeTimers();
    render(<ToastProvider closeLabel="Dismiss" aria-label="Alerts" />);
    act(() => {
      toast.info("Bye", { duration: 0 });
    });
    const region = screen.getByRole("region", { name: "Alerts" });
    fireEvent.click(within(region).getByRole("button", { name: "Dismiss" }));
    expect(within(region).getByRole("status")).toHaveAttribute(
      "data-state",
      "closing",
    );
    act(() => vi.advanceTimersByTime(200));
    expect(within(region).queryByRole("status")).toBeNull();
  });

  it("pauses the timer on hover / focus and resumes on leave / blur", () => {
    vi.useFakeTimers();
    render(<ToastProvider />);
    act(() => {
      toast.info("Hover", { duration: 1000 });
    });
    const item = screen.getByRole("status");
    fireEvent.mouseEnter(item);
    act(() => vi.advanceTimersByTime(2000));
    expect(item).toHaveAttribute("data-state", "open");
    fireEvent.mouseLeave(item);
    const close = within(item).getByRole("button");
    fireEvent.focus(close);
    act(() => vi.advanceTimersByTime(2000));
    expect(item).toHaveAttribute("data-state", "open");
    // focus moving inside the toast keeps it paused
    fireEvent.blur(close, { relatedTarget: item });
    act(() => vi.advanceTimersByTime(2000));
    expect(item).toHaveAttribute("data-state", "open");
    fireEvent.blur(close, { relatedTarget: null });
    act(() => vi.advanceTimersByTime(1000));
    expect(item).toHaveAttribute("data-state", "closing");
  });

  it("does not pause when pauseOnHover is false", () => {
    vi.useFakeTimers();
    render(<ToastProvider pauseOnHover={false} />);
    act(() => {
      toast.info("No pause", { duration: 500 });
    });
    const item = screen.getByRole("status");
    fireEvent.mouseEnter(item);
    act(() => vi.advanceTimersByTime(500));
    expect(item).toHaveAttribute("data-state", "closing");
    fireEvent.mouseLeave(item);
  });

  it("renders nothing on the server", () => {
    toast.info("server", { duration: 0 });
    const html = renderToString(
      <ToastProvider>
        <span>content</span>
      </ToastProvider>,
    );
    expect(html).toContain("content");
    expect(html).not.toContain("viewport");
    expect(html).not.toContain("server");
  });
});

// Loading / update / promise / max and per-toast options.
describe("toast: loading, update, promise, max and options", () => {
  const setupUser = () =>
    userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));
  const show = (fn: () => string | number) => {
    let id: string | number = "";
    act(() => {
      id = fn();
    });
    return id;
  };

  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });

  it.each([
    ["info", "status"],
    ["success", "status"],
    ["warning", "status"],
    ["danger", "alert"],
  ] as const)("toast.%s renders with role=%s", (method, role) => {
    render(<ToastProvider />);
    show(() => toast[method]("Announced", { duration: 0 }));
    const item = screen.getByRole(role);
    expect(item).toHaveTextContent("Announced");
    expect(item).toHaveClass(method);
  });

  it("a loading toast is a polite status whatever its color", () => {
    render(<ToastProvider />);
    show(() => toast({ title: "Deleting", color: "danger", loading: true }));
    const item = screen.getByRole("status");
    expect(item).toHaveClass("danger");
    expect(item).toHaveAttribute("data-loading", "true");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("toast.loading shows a decorative spinner and never auto-closes", () => {
    vi.useFakeTimers();
    render(<ToastProvider />);
    show(() => toast.loading("Saving…"));
    const item = screen.getByRole("status");
    expect(item).toHaveClass("info");
    expect(item).toHaveAttribute("data-loading", "true");
    expect(item.querySelector(".icon .spinner")).not.toBeNull();
    // The toast itself is the live region: the spinner is not a progressbar
    expect(screen.queryByRole("progressbar")).toBeNull();
    expect(item.querySelector(".progress")).toBeNull();
    advance(60_000);
    expect(item).toHaveAttribute("data-state", "open");
  });

  it("accepts a React element title, a custom icon, or no icon", () => {
    render(<ToastProvider />);
    show(() =>
      toast.success(<strong>Bold</strong>, {
        icon: <span data-testid="icon" />,
        duration: 0,
      }),
    );
    expect(screen.getByText("Bold").tagName).toBe("STRONG");
    const icon = screen.getByTestId("icon");
    expect(icon.parentElement).toHaveClass("icon");
    expect(icon.parentElement).toHaveAttribute("aria-hidden", "true");

    show(() => toast.info("Plain", { id: "plain", icon: null, duration: 0 }));
    expect(
      screen.getByText("Plain").closest(".toast")!.querySelector(".icon"),
    ).toBeNull();
  });

  it("hides the close button when closable is false", () => {
    render(<ToastProvider />);
    show(() => toast.info("No close", { closable: false, duration: 0 }));
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("auto-closes after the default 4000ms and calls onClose once with the id", () => {
    vi.useFakeTimers();
    render(<ToastProvider />);
    const onClose = vi.fn();
    const id = show(() => toast.info("Bye", { onClose }));
    advance(3999);
    expect(onClose).not.toHaveBeenCalled();
    advance(1);
    expect(onClose).toHaveBeenCalledExactlyOnceWith(id);
    advance(200);
    expect(screen.queryByRole("status")).toBeNull();
    // Later dismissals do not call it again
    act(() => toast.dismiss(id));
    act(() => toast.dismiss());
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("respects a custom duration", () => {
    vi.useFakeTimers();
    render(<ToastProvider />);
    show(() => toast.info("Quick", { duration: 500 }));
    advance(500);
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "closing");
  });

  it("closes via a labelled close button that does not submit forms, calling onClose", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = setupUser();
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    const onClose = vi.fn();
    render(
      <form onSubmit={onSubmit}>
        <ToastProvider closeLabel="Dismiss" />
      </form>,
    );
    const id = show(() => toast.danger("Closable", { duration: 0, onClose }));
    const close = screen.getByRole("button", { name: "Dismiss" });
    expect(close).toHaveAttribute("type", "button");
    await user.click(close);
    expect(onClose).toHaveBeenCalledExactlyOnceWith(id);
    expect(onSubmit).not.toHaveBeenCalled();
    advance(200);
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("renders an action button that is keyboard operable and closes the toast", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = setupUser();
    const onClick = vi.fn();
    render(<ToastProvider />);
    show(() =>
      toast.info("Message archived", {
        duration: 0,
        action: { label: "Undo", onClick },
      }),
    );
    const action = screen.getByRole("button", { name: "Undo" });
    expect(action).toHaveAttribute("type", "button");
    await user.tab();
    expect(action).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "closing");
  });

  it("pauses while hovered and resumes the remaining time afterwards", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = setupUser();
    const onClose = vi.fn();
    render(<ToastProvider />);
    show(() => toast.info("Hover", { duration: 1000, onClose }));
    const item = screen.getByRole("status");
    advance(400);
    await user.hover(item);
    advance(3000);
    expect(onClose).not.toHaveBeenCalled();
    await user.unhover(item);
    // Only the remaining ~600ms are needed, not a fresh 1000ms
    advance(700);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("pauses while keyboard focus is inside the toast", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = setupUser();
    const onClose = vi.fn();
    render(<ToastProvider />);
    show(() => toast.info("Focus", { duration: 1000, onClose }));
    advance(300);
    await user.tab();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    advance(3000);
    expect(onClose).not.toHaveBeenCalled();
    act(() => screen.getByRole("button", { name: "Close" }).blur());
    advance(800);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("dismiss(id) closes only that toast; dismiss() calls every onClose and clears timers", () => {
    vi.useFakeTimers();
    render(<ToastProvider />);
    const onCloseA = vi.fn();
    const onCloseB = vi.fn();
    const onCloseC = vi.fn();
    const a = show(() =>
      toast.info("A", { duration: 1000, onClose: onCloseA }),
    );
    const b = show(() =>
      toast.info("B", { duration: 2000, onClose: onCloseB }),
    );
    const c = show(() => toast.info("C", { duration: 0, onClose: onCloseC }));
    act(() => toast.dismiss(a));
    expect(onCloseA).toHaveBeenCalledExactlyOnceWith(a);
    expect(onCloseB).not.toHaveBeenCalled();
    act(() => toast.dismiss());
    expect(onCloseB).toHaveBeenCalledExactlyOnceWith(b);
    expect(onCloseC).toHaveBeenCalledExactlyOnceWith(c);
    advance(200);
    expect(vi.getTimerCount()).toBe(0);
    expect(screen.queryAllByRole("status")).toHaveLength(0);
    // New toasts still show afterwards
    show(() => toast.info("After", { duration: 0 }));
    expect(screen.getByRole("status")).toHaveTextContent("After");
  });

  it("update() changes a toast in place; loading turns into an auto-closing success", () => {
    vi.useFakeTimers();
    render(<ToastProvider />);
    const onClose = vi.fn();
    const id = show(() => toast.loading("Saving", { onClose }));
    const item = screen.getByRole("status");
    act(() => toast.update(id, { title: "Still saving", color: "success" }));
    // loading is kept (and the toast stays open) unless it is cleared
    expect(item).toHaveAttribute("data-loading", "true");
    advance(10_000);
    expect(item).toHaveAttribute("data-state", "open");
    act(() => toast.update(id, { title: "Saved", loading: false }));
    expect(screen.getByRole("status")).toBe(item);
    expect(item).toHaveTextContent("Saved");
    expect(item).toHaveClass("success");
    expect(item).not.toHaveAttribute("data-loading");
    expect(item.querySelector(".icon .spinner")).toBeNull();
    expect(store.peek()).toHaveLength(1);
    advance(4000);
    expect(onClose).toHaveBeenCalledExactlyOnceWith(id);
  });

  it("update() keeps unspecified options, honours a new duration and ignores unknown ids", () => {
    vi.useFakeTimers();
    render(<ToastProvider />);
    const id = show(() =>
      toast.warning("Low disk", { description: "2 GB left", duration: 0 }),
    );
    act(() => toast.update("missing", { title: "Changed" }));
    act(() => toast.update(id, { description: "1 GB left", duration: 300 }));
    const item = screen.getByRole("status");
    expect(item).toHaveTextContent("Low disk");
    expect(item).toHaveTextContent("1 GB left");
    expect(item).toHaveClass("warning");
    advance(300);
    expect(item).toHaveAttribute("data-state", "closing");
  });

  it("toast.promise follows a promise from loading to success", async () => {
    vi.useFakeTimers();
    render(<ToastProvider />);
    let resolve: (value: number) => void = () => undefined;
    const pending = new Promise<number>((r) => {
      resolve = r;
    });
    let returned: Promise<number> | undefined;
    act(() => {
      returned = toast.promise(pending, {
        loading: "Uploading",
        success: (count) => `Uploaded ${count} files`,
        error: "Upload failed",
      });
    });
    expect(returned).toBe(pending);
    expect(screen.getByRole("status")).toHaveAttribute("data-loading", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Uploading");
    await act(async () => {
      resolve(3);
      await pending;
    });
    expect(screen.getByRole("status")).toHaveClass("success");
    expect(screen.getByRole("status")).not.toHaveAttribute("data-loading");
    expect(screen.getByRole("status")).toHaveTextContent("Uploaded 3 files");
    expect(store.peek()).toHaveLength(1);
    advance(4000);
    expect(store.peek()[0]?.state).toBe("closing");
  });

  it("toast.promise shows a danger toast when the promise rejects", async () => {
    render(<ToastProvider />);
    const failing = Promise.reject(new Error("Network down"));
    await act(async () => {
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
    });
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("danger");
    expect(alert).toHaveTextContent("Failed: Network down");
    expect(store.peek().map((t) => t.id)).toEqual(["upload"]);
  });

  it("chains toasts with onClose", () => {
    vi.useFakeTimers();
    render(<ToastProvider />);
    show(() =>
      toast.loading("Saving", {
        duration: 100,
        onClose: () => toast.success("Saved", { duration: 0 }),
      }),
    );
    expect(screen.getByRole("status")).toHaveTextContent("Saving");
    advance(100);
    advance(200);
    expect(screen.getByRole("status")).toHaveTextContent("Saved");
    expect(screen.getByRole("status")).toHaveClass("success");
  });

  it("keeps at most max toasts, closing the oldest first", () => {
    vi.useFakeTimers();
    render(<ToastProvider max={2} />);
    const onClose = vi.fn();
    const first = show(() => toast.info("1", { duration: 0, onClose }));
    show(() => toast.info("2", { duration: 0 }));
    show(() => toast.danger("3", { duration: 0 }));
    expect(onClose).toHaveBeenCalledExactlyOnceWith(first);
    advance(200);
    expect(
      [...screen.queryAllByRole("status"), ...screen.queryAllByRole("alert")]
        .map((el) => el.querySelector(".title")?.textContent)
        .sort(),
    ).toEqual(["2", "3"]);
  });

  it.each([
    "topRight",
    "topLeft",
    "topCenter",
    "bottomRight",
    "bottomLeft",
    "bottomCenter",
  ] as const)("stacks toasts at %s", (position) => {
    render(<ToastProvider position={position} />);
    show(() => toast.info("Placed", { duration: 0 }));
    const region = screen.getByRole("region", { name: "Notifications (F8)" });
    expect(region).toHaveClass("viewport", position);
    expect(region).toContainElement(screen.getByRole("status"));
  });

  it("translates the close button label and lets closeLabel win", () => {
    act(() => {
      i18n.changeLanguage("zh");
    });
    const { rerender } = render(<ToastProvider />);
    show(() => toast.info("Hi", { duration: 0 }));
    expect(screen.getByRole("button", { name: "关闭" })).toBeInTheDocument();
    rerender(<ToastProvider closeLabel="Dismiss" />);
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
  it("renders each toast once when two providers are mounted", () => {
    render(
      <>
        <ToastProvider aria-label="First" />
        <ToastProvider aria-label="Second" />
      </>,
    );
    act(() => {
      toast.success("Saved once", { duration: 0 });
    });
    expect(screen.getAllByText("Saved once")).toHaveLength(1);
    expect(screen.getAllByRole("region")).toHaveLength(1);
    expect(
      within(screen.getByRole("region", { name: "First" })).getByText(
        "Saved once",
      ),
    ).toBeInTheDocument();
  });

  it("lets the outermost of nested providers render the toasts", () => {
    render(
      <ToastProvider aria-label="Outer" position="bottomLeft">
        <ToastProvider aria-label="Inner" position="topCenter" />
      </ToastProvider>,
    );
    act(() => {
      toast.info("Nested", { duration: 0 });
    });
    expect(screen.getAllByText("Nested")).toHaveLength(1);
    expect(screen.getByRole("region", { name: "Outer" })).toHaveClass(
      "bottomLeft",
    );
    expect(
      screen.queryByRole("region", { name: "Inner" }),
    ).not.toBeInTheDocument();
  });

  it("hands the toasts over to the remaining provider when the owner unmounts", () => {
    const Page = ({ first }: { first: boolean }) => (
      <>
        {first && <ToastProvider aria-label="First" />}
        <ToastProvider aria-label="Second" />
      </>
    );
    const { rerender } = render(<Page first />);
    act(() => {
      toast.warning("Still here", { duration: 0 });
    });
    expect(
      within(screen.getByRole("region", { name: "First" })).getByText(
        "Still here",
      ),
    ).toBeInTheDocument();

    rerender(<Page first={false} />);
    expect(
      screen.queryByRole("region", { name: "First" }),
    ).not.toBeInTheDocument();
    expect(
      within(screen.getByRole("region", { name: "Second" })).getByText(
        "Still here",
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Still here")).toHaveLength(1);
  });

  it("keeps a provider mounted later from taking over a live owner", () => {
    const Page = ({ second }: { second: boolean }) => (
      <>
        <ToastProvider aria-label="First" />
        {second && <ToastProvider aria-label="Second" />}
      </>
    );
    const { rerender } = render(<Page second={false} />);
    rerender(<Page second />);
    act(() => {
      toast.info("Owned", { duration: 0 });
    });
    expect(
      within(screen.getByRole("region", { name: "First" })).getByText("Owned"),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Owned")).toHaveLength(1);
  });

  it("portals into the theme scope of a nested ConfigProvider", () => {
    render(
      <ConfigProvider theme="light">
        <ConfigProvider theme="dark">
          <ToastProvider aria-label="Scoped" />
        </ConfigProvider>
        <ToastProvider aria-label="Later" />
      </ConfigProvider>,
    );
    act(() => {
      toast.success("Themed", { duration: 0 });
    });
    expect(screen.getAllByText("Themed")).toHaveLength(1);
    const region = screen.getByRole("region", { name: "Scoped" });
    const host = region.closest("[data-minerva-portal-host]");
    expect(host).not.toBeNull();
    expect(host).toHaveAttribute("data-theme", "dark");
  });
});
