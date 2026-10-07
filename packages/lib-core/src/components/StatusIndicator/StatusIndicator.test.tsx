import { createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import StatusIndicator from "./StatusIndicator";

describe("StatusIndicator", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders a focusable status element with default classes", () => {
    render(<StatusIndicator ariaLabel="Build status" />);

    const indicator = screen.getByRole("status", { name: "Build status" });
    expect(indicator).toHaveClass(
      "statusIndicator",
      "success",
      "circle",
      "medium",
    );
    expect(indicator).toHaveAttribute("tabindex", "0");
    expect(indicator).toHaveAttribute("aria-disabled", "false");
    expect(indicator.querySelector("svg.icon")).toBeInTheDocument();
  });

  it.each(["success", "error", "warning", "info"] as const)(
    "renders the %s status with an icon",
    (status) => {
      render(<StatusIndicator status={status} />);

      const indicator = screen.getByRole("status");
      expect(indicator).toHaveClass(status);
      expect(indicator.querySelector("svg")).toBeInTheDocument();
    },
  );

  it("applies shape, size, type and className", () => {
    render(
      <StatusIndicator
        shape="rounded"
        size="large"
        type="busy"
        className="mine"
      />,
    );

    expect(screen.getByRole("status")).toHaveClass(
      "rounded",
      "large",
      "busy",
      "mine",
    );
  });

  it.each([
    ["online", "Online"],
    ["offline", "Offline"],
    ["away", "Away"],
    ["busy", "Busy"],
  ] as const)("shows the label for %s when showLabel is set", (type, text) => {
    render(<StatusIndicator type={type} showLabel />);

    expect(screen.getByText(text)).toHaveClass("label");
  });

  it("does not show a label without showLabel or for the custom type", () => {
    const { container, rerender } = render(<StatusIndicator type="online" />);
    expect(container.querySelector(".label")).not.toBeInTheDocument();

    rerender(<StatusIndicator type="custom" showLabel />);
    expect(container.querySelector(".label")).not.toBeInTheDocument();
  });

  it("applies a custom color only for the custom type", () => {
    const { rerender } = render(<StatusIndicator type="custom" color="red" />);
    expect(screen.getByRole("status")).toHaveStyle({ backgroundColor: "red" });

    rerender(<StatusIndicator type="online" color="red" />);
    expect(screen.getByRole("status").style.backgroundColor).toBe("");
  });

  it("adds the clicked class on click and removes it after 1 second", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<StatusIndicator />);

    const indicator = screen.getByRole("status");
    await user.click(indicator);
    expect(indicator).toHaveClass("clicked");

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(indicator).toHaveClass("clicked");

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(indicator).not.toHaveClass("clicked");
  });

  it("does not react to clicks when disabled", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<StatusIndicator disabled />);

    const indicator = screen.getByRole("status");
    expect(indicator).toHaveAttribute("aria-disabled", "true");
    await user.click(indicator);

    expect(indicator).not.toHaveClass("clicked");
  });

  it("restarts the feedback timer on repeated clicks", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<StatusIndicator />);
    const indicator = screen.getByRole("status");
    await user.click(indicator);
    act(() => {
      vi.advanceTimersByTime(800);
    });
    await user.click(indicator);
    act(() => {
      vi.advanceTimersByTime(500);
    });
    // The first click's timer must not cut the second animation short
    expect(indicator).toHaveClass("clicked");
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(indicator).not.toHaveClass("clicked");
  });

  it("clears the feedback timer on unmount", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { unmount } = render(<StatusIndicator />);
    await user.click(screen.getByRole("status"));
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("uses the presence text as accessible name when no ariaLabel is given", () => {
    render(<StatusIndicator type="away" />);
    expect(screen.getByRole("status", { name: "Away" })).toBeInTheDocument();
  });

  it("hides the status icon from assistive technologies", () => {
    render(<StatusIndicator />);
    expect(screen.getByRole("status").querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("forwards ref to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<StatusIndicator ref={ref} />);
    expect(ref.current).toBe(screen.getByRole("status").parentElement);
  });
});
