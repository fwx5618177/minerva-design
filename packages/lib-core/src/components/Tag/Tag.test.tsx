import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import Tag from "./Tag";

const getTag = (text: string) =>
  screen.getByText(text).closest(".tag") as HTMLElement;

describe("Tag", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders children with default classes", () => {
    render(<Tag>Label</Tag>);
    const tag = getTag("Label");
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass("tag", "default", "medium", "rounded");
    expect(tag).not.toHaveClass("clickable");
  });

  it.each(["primary", "success", "warning", "error", "info"] as const)(
    "applies the %s variant class",
    (variant) => {
      render(<Tag variant={variant}>V</Tag>);
      expect(getTag("V")).toHaveClass(variant);
    },
  );

  it.each(["small", "large"] as const)("applies the %s size class", (size) => {
    render(<Tag size={size}>S</Tag>);
    expect(getTag("S")).toHaveClass(size);
  });

  it.each(["square", "circle"] as const)(
    "applies the %s shape class",
    (shape) => {
      render(<Tag shape={shape}>S</Tag>);
      expect(getTag("S")).toHaveClass(shape);
    },
  );

  it("applies bordered, elevation, disabled and custom className", () => {
    render(
      <Tag bordered elevation disabled className="mine">
        T
      </Tag>,
    );
    expect(getTag("T")).toHaveClass(
      "bordered",
      "elevation",
      "disabled",
      "mine",
    );
  });

  it("applies custom colors over the style prop", () => {
    render(
      <Tag
        style={{ margin: "4px" }}
        bgColor="red"
        textColor="blue"
        borderColor="green"
      >
        T
      </Tag>,
    );
    const tag = getTag("T");
    expect(tag.style.margin).toBe("4px");
    expect(tag.style.backgroundColor).toBe("red");
    expect(tag.style.color).toBe("blue");
    expect(tag.style.borderColor).toBe("green");
  });

  it("renders an icon", () => {
    render(<Tag icon={<span data-testid="icon" />}>T</Tag>);
    expect(getTag("T")).toContainElement(screen.getByTestId("icon"));
  });

  it("calls onClick with the event when clickable", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Tag clickable onClick={onClick}>
        T
      </Tag>,
    );
    expect(getTag("T")).toHaveClass("clickable");
    await user.click(screen.getByText("T"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toHaveProperty("type", "click");
  });

  it("does not call onClick when not clickable", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Tag onClick={onClick}>T</Tag>);
    await user.click(screen.getByText("T"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Tag clickable disabled onClick={onClick}>
        T
      </Tag>,
    );
    expect(getTag("T")).not.toHaveClass("clickable");
    await user.click(screen.getByText("T"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders the close icon only when closable", () => {
    const { container, rerender } = render(<Tag>T</Tag>);
    expect(container.querySelector(".closeIcon")).not.toBeInTheDocument();
    rerender(<Tag closable>T</Tag>);
    expect(container.querySelector(".closeIcon")).toBeInTheDocument();
  });

  it("calls onClose without triggering onClick", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onClick = vi.fn();
    const { container } = render(
      <Tag closable clickable onClose={onClose} onClick={onClick}>
        T
      </Tag>,
    );
    await user.click(container.querySelector(".closeIcon") as HTMLElement);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose.mock.calls[0][0]).toHaveProperty("type", "click");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not call onClose when disabled", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(
      <Tag closable disabled onClose={onClose}>
        T
      </Tag>,
    );
    await user.click(container.querySelector(".closeIcon") as HTMLElement);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("renders a custom close icon", () => {
    render(
      <Tag closable closeIcon={<span data-testid="x" />}>
        T
      </Tag>,
    );
    expect(screen.getByTestId("x").closest(".closeIcon")).toBeInTheDocument();
  });

  it("adds a ripple on click and removes it after 600ms", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Tag clickable>T</Tag>);
    const tag = getTag("T");
    await user.click(tag);
    expect(tag.querySelector(".ripple")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(tag.querySelector(".ripple")).not.toBeInTheDocument();
  });

  it("does not add a ripple when ripple is false or disabled", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Tag ripple={false}>T</Tag>);
    await user.click(getTag("T"));
    expect(getTag("T").querySelector(".ripple")).not.toBeInTheDocument();

    rerender(<Tag disabled>T</Tag>);
    await user.click(getTag("T"));
    expect(getTag("T").querySelector(".ripple")).not.toBeInTheDocument();
  });

  it("renders the close control as a labelled native button", () => {
    render(<Tag closable>T</Tag>);
    const close = screen.getByRole("button", { name: "Close" });
    expect(close.tagName).toBe("BUTTON");
    expect(close).toHaveAttribute("type", "button");
    expect(close).toHaveClass("closeIcon");
  });

  it("uses closeLabel as the close button's accessible name", () => {
    render(
      <Tag closable closeLabel="Remove tag">
        T
      </Tag>,
    );
    expect(
      screen.getByRole("button", { name: "Remove tag" }),
    ).toBeInTheDocument();
  });

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])(
    "activates the close button with %s without triggering onClick",
    async (_, key) => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      const onClick = vi.fn();
      render(
        <Tag closable clickable onClose={onClose} onClick={onClick}>
          T
        </Tag>,
      );
      // the clickable tag itself is the first tab stop, the close button next
      await user.tab();
      expect(screen.getByRole("button", { name: "T" })).toHaveFocus();
      await user.tab();
      const close = screen.getByRole("button", { name: "Close" });
      expect(close).toHaveFocus();
      await user.keyboard(key);
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClick).not.toHaveBeenCalled();
    },
  );

  it("disables the close button when the tag is disabled", () => {
    render(
      <Tag closable disabled>
        T
      </Tag>,
    );
    expect(screen.getByRole("button", { name: "Close" })).toBeDisabled();
  });
  describe("keyboard / a11y when clickable", () => {
    it("exposes role=button and is focusable", () => {
      render(
        <Tag clickable onClick={() => {}}>
          K
        </Tag>,
      );
      const tag = screen.getByRole("button", { name: "K" });
      expect(tag).toHaveAttribute("tabindex", "0");
      expect(tag).toHaveClass("clickable");
    });

    it("is not a button nor focusable when not clickable", () => {
      render(<Tag>Static</Tag>);
      const tag = getTag("Static");
      expect(tag).not.toHaveAttribute("role");
      expect(tag).not.toHaveAttribute("tabindex");
    });

    it.each(["{Enter}", " "])("activates onClick with %s", async (key) => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Tag clickable onClick={onClick} ripple={false}>
          K
        </Tag>,
      );
      await user.tab();
      expect(screen.getByRole("button", { name: "K" })).toHaveFocus();
      await user.keyboard(key);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("prevents the default action of Space (page scroll)", () => {
      render(
        <Tag clickable onClick={() => {}}>
          K
        </Tag>,
      );
      const tag = screen.getByRole("button", { name: "K" });
      const event = new KeyboardEvent("keydown", {
        key: " ",
        bubbles: true,
        cancelable: true,
      });
      act(() => {
        tag.dispatchEvent(event);
      });
      expect(event.defaultPrevented).toBe(true);
    });

    it("is not focusable and ignores keys when disabled", async () => {
      const onClick = vi.fn();
      render(
        <Tag clickable disabled onClick={onClick}>
          K
        </Tag>,
      );
      const tag = screen.getByRole("button", { name: "K" });
      expect(tag).toHaveAttribute("aria-disabled", "true");
      expect(tag).not.toHaveAttribute("tabindex");
      tag.focus();
      await userEvent.keyboard("{Enter}");
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
