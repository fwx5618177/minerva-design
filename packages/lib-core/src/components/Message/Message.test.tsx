import React from "react";
import { act, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { message, useMessage } from "./index";
import type {
  MessageOptions,
  MessagePromiseResult,
  MessageType,
} from "./types";

const show = (type: MessageType, content: React.ReactNode | MessageOptions) => {
  let id = "";
  act(() => {
    id = message[type](content);
  });
  return id;
};

const advance = (ms: number) => {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
};

const setupUser = () =>
  userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  act(() => {
    message.destroy();
  });
  vi.useRealTimers();
});

describe("message API", () => {
  it("renders a string message into a body container and returns its id", () => {
    const id = show("info", "Hello");
    expect(id).toMatch(/^message-\d+$/);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Hello");
    expect(alert).toHaveClass("message", "info");
    expect(
      document.getElementById("message-container-topRight"),
    ).toContainElement(alert);
  });

  it("generates unique ids", () => {
    const a = show("info", "A");
    const b = show("info", "B");
    expect(a).not.toBe(b);
    expect(screen.getAllByRole("alert")).toHaveLength(2);
  });

  it.each(["success", "error", "info", "warning", "loading"] as const)(
    "message.%s applies the matching type class",
    (type) => {
      show(type, "Typed");
      expect(screen.getByRole("alert")).toHaveClass(type);
    },
  );

  it("accepts a React element as content", () => {
    show("success", <strong>Bold</strong>);
    expect(screen.getByText("Bold").tagName).toBe("STRONG");
  });

  it("accepts an options object with custom id, icon, className and style", () => {
    const id = show("warning", {
      id: "custom",
      content: "Opts",
      icon: <span data-testid="icon" />,
      className: "mine",
      style: { color: "red" },
      maxWidth: 200,
      zIndex: 99,
      description: "More details",
    });
    expect(id).toBe("custom");
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("warning", "mine");
    expect(alert).toContainElement(screen.getByTestId("icon"));
    expect(alert.style.color).toBe("red");
    expect(alert.style.maxWidth).toBe("200px");
    expect(alert.style.zIndex).toBe("99");
    expect(alert).toHaveAttribute("aria-description", "More details");
  });

  it.each([
    "top",
    "topLeft",
    "topRight",
    "bottom",
    "bottomLeft",
    "bottomRight",
  ] as const)("renders into the %s placement container", (placement) => {
    show("info", { content: "Placed", placement });
    const container = document.getElementById(`message-container-${placement}`);
    expect(container).toHaveClass("messageContainer", placement);
    expect(container).toContainElement(screen.getByRole("alert"));
  });

  it("auto-closes after the default 3000ms and calls onClose with the id", () => {
    const onClose = vi.fn();
    const id = show("info", { content: "Bye", onClose });

    advance(2900);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();

    advance(200);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith(id);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(
      document.getElementById("message-container-topRight"),
    ).not.toBeInTheDocument();
  });

  it("respects a custom duration", () => {
    show("info", { content: "Quick", duration: 500 });
    advance(600);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("never auto-closes and hides the progress bar when duration is 0", () => {
    const onClose = vi.fn();
    show("info", { content: "Sticky", duration: 0, onClose });
    expect(
      screen.getByRole("alert").querySelector(".progressBar"),
    ).not.toBeInTheDocument();
    advance(10000);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  it("shrinks the progress bar over time", () => {
    show("info", { content: "Progress", duration: 1000 });
    const bar = screen
      .getByRole("alert")
      .querySelector(".progressBar") as HTMLElement;
    expect(bar.style.width).toBe("100%");
    advance(500);
    expect(parseFloat(bar.style.width)).toBeLessThan(60);
    expect(parseFloat(bar.style.width)).toBeGreaterThan(40);
  });

  it("hides the progress bar when showProgress is false", () => {
    show("info", { content: "No bar", showProgress: false });
    expect(
      screen.getByRole("alert").querySelector(".progressBar"),
    ).not.toBeInTheDocument();
  });

  it("closes via the labelled close button", async () => {
    const user = setupUser();
    const onClose = vi.fn();
    const id = show("error", {
      content: "Closable",
      duration: 0,
      showClose: true,
      closeAriaLabel: "Dismiss",
      onClose,
    });
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onClose).toHaveBeenCalledWith(id);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("does not render a close button by default", () => {
    show("info", "No close");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls onClick when the message is clicked", async () => {
    const user = setupUser();
    const onClick = vi.fn();
    show("info", { content: "Click me", duration: 0, onClick });
    await user.click(screen.getByText("Click me"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toHaveProperty("type", "click");
  });

  it("pauses while hovered and resumes the remaining time afterwards", async () => {
    const user = setupUser();
    const onClose = vi.fn();
    show("info", { content: "Hover", duration: 1000, onClose });
    const alert = screen.getByRole("alert");

    advance(400);
    await user.hover(alert);
    expect(alert.querySelector(".progressBar")).toHaveClass("paused");
    const pausedWidth = (alert.querySelector(".progressBar") as HTMLElement)
      .style.width;

    advance(3000);
    expect(onClose).not.toHaveBeenCalled();
    expect(
      (alert.querySelector(".progressBar") as HTMLElement).style.width,
    ).toBe(pausedWidth);

    await user.unhover(alert);
    expect(alert.querySelector(".progressBar")).not.toHaveClass("paused");
    // Only the remaining ~600ms should be needed, not a fresh 1000ms.
    advance(700);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not pause on hover when pauseOnHover is false", async () => {
    const user = setupUser();
    const onClose = vi.fn();
    show("info", {
      content: "No pause",
      duration: 1000,
      pauseOnHover: false,
      onClose,
    });
    await user.hover(screen.getByRole("alert"));
    advance(1100);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("destroy(id) removes only the given message and calls its onClose", () => {
    const onClose = vi.fn();
    const otherOnClose = vi.fn();
    const id = show("info", { content: "First", duration: 0, onClose });
    show("info", { content: "Second", duration: 0, onClose: otherOnClose });

    act(() => {
      message.destroy(id);
    });
    expect(screen.queryByText("First")).not.toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith(id);
    expect(otherOnClose).not.toHaveBeenCalled();
  });

  it("destroy() calls onClose for every removed message", () => {
    const onCloseA = vi.fn();
    const onCloseB = vi.fn();
    const idA = show("info", { content: "A", duration: 0, onClose: onCloseA });
    const idB = show("info", {
      content: "B",
      duration: 0,
      placement: "bottom",
      onClose: onCloseB,
    });

    act(() => {
      message.destroy();
    });
    expect(onCloseA).toHaveBeenCalledExactlyOnceWith(idA);
    expect(onCloseB).toHaveBeenCalledExactlyOnceWith(idB);
  });

  it("never calls onClose twice for the same message", () => {
    const onClose = vi.fn();
    const next = vi.fn();
    const id = show("info", { content: "Once", duration: 1000, onClose });
    act(() => {
      message.update(id, { onClose: next });
    });
    act(() => {
      message.destroy(id);
    });
    act(() => {
      message.destroy(id);
      message.destroy();
    });
    advance(2000);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("destroy() removes all messages and containers", () => {
    show("info", { content: "A", duration: 0 });
    show("info", { content: "B", duration: 0, placement: "bottom" });

    act(() => {
      message.destroy();
    });
    expect(screen.queryAllByRole("alert")).toHaveLength(0);
    expect(
      document.querySelectorAll("[id^='message-container-']"),
    ).toHaveLength(0);
  });

  it("allows new messages after destroy()", () => {
    show("info", { content: "Before", duration: 0 });
    act(() => {
      message.destroy();
    });
    show("info", { content: "After", duration: 0 });
    expect(screen.getByRole("alert")).toHaveTextContent("After");
  });

  it("update() re-renders content and type, calling onUpdate", () => {
    const onUpdate = vi.fn();
    const id = show("loading", { content: "Saving", duration: 0 });

    act(() => {
      message.update(id, { content: "Saved", type: "success", onUpdate });
    });
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Saved");
    expect(alert).toHaveClass("success");
    expect(onUpdate).toHaveBeenCalledWith(
      id,
      expect.objectContaining({ id, content: "Saved", type: "success" }),
    );
  });

  it("update() keeps the original onClose and chains the new one", async () => {
    const user = setupUser();
    const original = vi.fn();
    const next = vi.fn();
    const id = show("info", {
      content: "Chain",
      duration: 0,
      showClose: true,
      onClose: original,
    });
    act(() => {
      message.update(id, { onClose: next });
    });
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(next).toHaveBeenCalledWith(id);
    expect(original).toHaveBeenCalledWith(id);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("update() on an unknown id is a no-op", () => {
    show("info", { content: "Stay", duration: 0 });
    act(() => {
      message.update("missing", { content: "Changed" });
    });
    expect(screen.getByRole("alert")).toHaveTextContent("Stay");
  });
});

describe("useMessage", () => {
  it("returns stable methods across rerenders", () => {
    const { result, rerender } = renderHook(() => useMessage());
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
    expect(result.current.destroy).toBe(message.destroy);
    expect(result.current.update).toBe(message.update);
  });

  it.each(["success", "error", "info", "warning", "loading"] as const)(
    "%s renders a typed message and exposes its id",
    (type) => {
      const { result } = renderHook(() => useMessage());
      let messageId = "";
      act(() => {
        messageId = result.current[type]("Hook").messageId;
      });
      expect(messageId).toMatch(/^message-\d+$/);
      expect(screen.getByRole("alert")).toHaveClass(type);
      expect(screen.getByRole("alert")).toHaveTextContent("Hook");
    },
  );

  it("resolves the promise when the message auto-closes", async () => {
    const { result } = renderHook(() => useMessage());
    const onClose = vi.fn();
    const settled = vi.fn();
    let closed: Promise<void> = Promise.resolve();
    let messageId = "";
    act(() => {
      const res = result.current.success({
        content: "Done",
        duration: 1000,
        onClose,
      });
      messageId = res.messageId;
      closed = res.then(settled);
    });

    await act(async () => {
      vi.advanceTimersByTime(500);
    });
    expect(settled).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(600);
    });
    await closed;
    expect(settled).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith(messageId);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("resolves the promise when closed via the close button", async () => {
    const user = setupUser();
    const { result } = renderHook(() => useMessage());
    let closed: Promise<void> = Promise.resolve();
    act(() => {
      closed = result.current.info({
        content: "Manual",
        duration: 0,
        showClose: true,
      });
    });
    await user.click(screen.getByRole("button", { name: "Close" }));
    await expect(closed).resolves.toBeUndefined();
  });

  it("resolves the promise when destroyed by id", async () => {
    const { result } = renderHook(() => useMessage());
    let closed: MessagePromiseResult | undefined;
    act(() => {
      closed = result.current.info({ content: "Bye", duration: 0 });
    });
    act(() => {
      message.destroy(closed?.messageId);
    });
    await expect(closed).resolves.toBeUndefined();
  });

  it("resolves all pending promises on destroy()", async () => {
    const { result } = renderHook(() => useMessage());
    const pending: Promise<void>[] = [];
    act(() => {
      pending.push(result.current.info({ content: "One", duration: 0 }));
      pending.push(
        result.current.error({
          content: "Two",
          duration: 0,
          placement: "bottomLeft",
        }),
      );
    });
    act(() => {
      result.current.destroy();
    });
    await expect(Promise.all(pending)).resolves.toEqual([undefined, undefined]);
  });

  it("supports chaining messages via the promise", async () => {
    const { result } = renderHook(() => useMessage());
    let chained: Promise<string> = Promise.resolve("");
    act(() => {
      chained = result.current
        .loading({ content: "Saving", duration: 100 })
        // Return only the id: returning the result itself would adopt its
        // promise and wait for "Saved" to close too.
        .then(
          () =>
            result.current.success({ content: "Saved", duration: 0 }).messageId,
        );
    });
    expect(screen.getByRole("alert")).toHaveTextContent("Saving");

    await act(async () => {
      vi.advanceTimersByTime(200);
    });
    const id = await chained;
    expect(id).toMatch(/^message-\d+$/);
    expect(screen.getByRole("alert")).toHaveTextContent("Saved");
    expect(screen.getByRole("alert")).toHaveClass("success");
  });
});
