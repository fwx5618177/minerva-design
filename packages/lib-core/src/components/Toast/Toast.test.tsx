// Store tests ported from @novel-isr/ui src/components/Toast/__test__/Toast.test.ts
// (same-id replacement semantics), plus rendering / provider tests.
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ToastProvider, toast, useToast } from ".";
import { toastStore as store } from "./store";
import { renderHook } from "@testing-library/react";

afterEach(() => {
  store.reset();
  vi.useRealTimers();
});

describe("toast store: same id replaces", () => {
  it("pushing the same id several times keeps one toast with the last content", () => {
    toast.error("first", { id: "k", duration: 0 });
    toast.error("second", { id: "k", duration: 0 });
    toast.error("third", { id: "k", duration: 0 });

    const items = store.peek();
    expect(items).toHaveLength(1);
    expect(items[0]?.id).toBe("k");
    expect(items[0]?.title).toBe("third");
  });

  it("different ids coexist", () => {
    toast.error("a", { id: "k1", duration: 0 });
    toast.error("b", { id: "k2", duration: 0 });

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
    toast.error("first", { id: "k", duration: 30 });
    await new Promise((r) => setTimeout(r, 10));
    toast.error("second", { id: "k", duration: 30 });
    await new Promise((r) => setTimeout(r, 25));
    expect(store.peek()).toHaveLength(1);
    expect(store.peek()[0]?.title).toBe("second");
  });

  it("maps shortcuts to statuses and defaults to info / 4000ms", () => {
    toast({ title: "plain" });
    toast.success("ok");
    toast.warning("careful");
    toast.error("bad");
    toast.info("fyi");
    expect(store.peek().map((t) => t.status)).toEqual([
      "info",
      "success",
      "warning",
      "danger",
      "info",
    ]);
    expect(store.peek()[0]?.duration).toBe(4000);
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

describe("ToastProvider", () => {
  it("useToast returns the toast function", () => {
    const { result } = renderHook(() => useToast());
    expect(result.current).toBe(toast);
  });

  it("renders toasts in a labelled region with novel-isr-ui hooks", () => {
    render(
      <ToastProvider position="bottomLeft">
        <p>App</p>
      </ToastProvider>,
    );
    expect(screen.getByText("App")).toBeInTheDocument();
    act(() => {
      toast.success("Saved", { description: "All good", duration: 3000 });
    });
    const region = screen.getByRole("region", { name: "Notifications" });
    expect(region).toHaveClass("ui-toast-viewport", "viewport", "bottomLeft");
    expect(region).toHaveAttribute("data-position", "bottom-left");
    const item = within(region).getByRole("status");
    expect(item).toHaveClass("ui-toast", "ui-toast-status-success", "success");
    expect(item).toHaveAttribute("data-state", "open");
    expect(item.style.getPropertyValue("--ui-toast-duration")).toBe("3000ms");
    expect(item.querySelector(".ui-toast-title")).toHaveTextContent("Saved");
    expect(item.querySelector(".ui-toast-description")).toHaveTextContent(
      "All good",
    );
    expect(item.querySelector(".ui-toast-icon svg")).not.toBeNull();
    expect(item.querySelector(".ui-toast-progress")).not.toBeNull();
  });

  it("uses role=alert for danger, hides empty parts and the progress of persistent toasts", () => {
    render(<ToastProvider />);
    act(() => {
      toast({ status: "danger", description: "Only description", duration: 0 });
    });
    const alert = screen.getByRole("alert");
    expect(alert.querySelector(".ui-toast-title")).toBeNull();
    expect(alert.querySelector(".ui-toast-progress")).toBeNull();
    expect(alert.style.getPropertyValue("--ui-toast-duration")).toBe("");
    expect(
      screen.getByRole("region", { name: "Notifications" }),
    ).toHaveAttribute("data-position", "top-right");
  });

  it("closes with the close button", () => {
    vi.useFakeTimers();
    render(<ToastProvider closeLabel="Dismiss" ariaLabel="Alerts" />);
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
    expect(html).not.toContain("ui-toast");
  });
});
