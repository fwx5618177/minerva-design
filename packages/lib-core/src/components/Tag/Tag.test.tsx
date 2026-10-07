import React, { StrictMode, createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
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
    expect(tag).toHaveClass("tag", "neutral", "subtle", "medium", "rounded");
    expect(tag).not.toHaveClass("clickable");
  });

  it.each(["primary", "success", "warning", "danger", "info"] as const)(
    "applies the %s color class",
    (color) => {
      render(<Tag color={color}>V</Tag>);
      expect(getTag("V")).toHaveClass(color);
    },
  );

  it.each(["subtle", "outline", "solid"] as const)(
    "applies the %s variant class",
    (variant) => {
      render(
        <Tag color="success" variant={variant}>
          V
        </Tag>,
      );
      expect(getTag("V")).toHaveClass("success", variant);
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

  it("applies outline, elevation, disabled and custom className", () => {
    render(
      <Tag variant="outline" elevation disabled className="mine">
        T
      </Tag>,
    );
    expect(getTag("T")).toHaveClass("outline", "elevation", "disabled", "mine");
  });

  it("forwards the style prop, including the color custom properties", () => {
    render(
      <Tag
        color="danger"
        style={
          {
            margin: "4px",
            "--tag-danger-bg": "red",
            "--tag-danger-text": "blue",
          } as React.CSSProperties
        }
      >
        T
      </Tag>,
    );
    const tag = getTag("T");
    expect(tag.style.margin).toBe("4px");
    expect(tag.style.getPropertyValue("--tag-danger-bg")).toBe("red");
    expect(tag.style.getPropertyValue("--tag-danger-text")).toBe("blue");
    expect(tag.style.backgroundColor).toBe("");
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

  it("adds a ripple when activated and removes it after 600ms", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Tag clickable>T</Tag>);
    const tag = getTag("T");
    // the ripple belongs to the tag's main action (its native button)
    await user.click(screen.getByRole("button", { name: "T" }));
    expect(tag.querySelector(".ripple")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(tag.querySelector(".ripple")).not.toBeInTheDocument();
  });

  it("does not add a ripple when ripple is false, disabled or not clickable", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Tag clickable ripple={false}>
        T
      </Tag>,
    );
    await user.click(screen.getByRole("button", { name: "T" }));
    expect(getTag("T").querySelector(".ripple")).not.toBeInTheDocument();

    rerender(<Tag>T</Tag>);
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
    it("renders the content as a native button", () => {
      render(
        <Tag clickable onClick={() => {}}>
          K
        </Tag>,
      );
      const action = screen.getByRole("button", { name: "K" });
      expect(action.tagName).toBe("BUTTON");
      expect(getTag("K")).toHaveClass("clickable");
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

    it("is not focusable and ignores keys when disabled", async () => {
      const onClick = vi.fn();
      render(
        <Tag clickable disabled onClick={onClick}>
          K
        </Tag>,
      );
      const tag = screen.getByRole("button", { name: "K" });
      expect(tag).toBeDisabled();
      tag.focus();
      expect(tag).not.toHaveFocus();
      await userEvent.keyboard("{Enter}");
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("clickable + closable (no nested interactive elements)", () => {
    const renderBoth = () => {
      const onClick = vi.fn();
      const onClose = vi.fn();
      const utils = render(
        <StrictMode>
          <Tag clickable closable onClick={onClick} onClose={onClose}>
            T
          </Tag>
        </StrictMode>,
      );
      return { ...utils, onClick, onClose };
    };

    it("renders the action and the close control as sibling buttons", () => {
      renderBoth();
      const tag = getTag("T");
      expect(tag).not.toHaveAttribute("role");
      expect(tag).not.toHaveAttribute("tabindex");
      const action = screen.getByRole("button", { name: "T" });
      const close = screen.getByRole("button", { name: "Close" });
      expect(action.tagName).toBe("BUTTON");
      expect(action).toHaveAttribute("type", "button");
      expect(action).not.toContainElement(close);
      expect(close).not.toContainElement(action);
      expect(action.parentElement).toBe(tag);
      expect(close.parentElement).toBe(tag);
      // no interactive element is nested inside another one
      for (const el of screen.getAllByRole("button")) {
        expect(el.parentElement?.closest("button, [role='button']")).toBeNull();
      }
    });

    it("reaches both buttons with Tab and activates each independently", async () => {
      const user = userEvent.setup();
      const { onClick, onClose } = renderBoth();
      await user.tab();
      expect(screen.getByRole("button", { name: "T" })).toHaveFocus();
      await user.keyboard("{Enter}");
      expect(onClick).toHaveBeenCalledTimes(1);
      await user.keyboard(" ");
      expect(onClick).toHaveBeenCalledTimes(2);
      expect(onClose).not.toHaveBeenCalled();

      await user.tab();
      expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
      await user.keyboard("{Enter}");
      await user.keyboard(" ");
      expect(onClose).toHaveBeenCalledTimes(2);
      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it("disables both buttons when disabled", () => {
      render(
        <Tag clickable closable disabled>
          T
        </Tag>,
      );
      expect(screen.getByRole("button", { name: "T" })).toBeDisabled();
      expect(screen.getByRole("button", { name: "Close" })).toBeDisabled();
    });

    it("exposes the pressed state of toggle tags", () => {
      const { rerender } = render(
        <Tag clickable pressed>
          T
        </Tag>,
      );
      expect(screen.getByRole("button", { name: "T" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      rerender(<Tag clickable>T</Tag>);
      expect(screen.getByRole("button", { name: "T" })).not.toHaveAttribute(
        "aria-pressed",
      );
    });

    it("forwards the ref to the root element", () => {
      const ref = createRef<HTMLDivElement>();
      render(<Tag ref={ref}>T</Tag>);
      expect(ref.current).toBe(getTag("T"));
    });

    it("clears pending ripple timers on unmount", async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const { unmount } = render(<Tag clickable>T</Tag>);
      await user.click(screen.getByRole("button", { name: "T" }));
      expect(vi.getTimerCount()).toBeGreaterThan(0);
      unmount();
      expect(vi.getTimerCount()).toBe(0);
    });
  });
});

describe("Tag localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });
  it("translates the close label and lets closeLabel win", () => {
    act(() => {
      i18n.changeLanguage("fr");
    });
    const { rerender } = render(<Tag closable>React</Tag>);
    expect(screen.getByRole("button", { name: "Fermer" })).toBeInTheDocument();

    rerender(
      <Tag closable closeLabel="Remove React">
        React
      </Tag>,
    );
    expect(
      screen.getByRole("button", { name: "Remove React" }),
    ).toBeInTheDocument();
  });
});

describe("Tag avatar, loading and selection", () => {
  it("renders an avatar after the icon", () => {
    render(
      <Tag icon={<span data-testid="icon" />} avatar={<img alt="" />}>
        Ada
      </Tag>,
    );
    const tag = getTag("Ada");
    const avatar = tag.querySelector(".avatar");
    expect(avatar).toContainElement(tag.querySelector("img"));
    expect(screen.getByTestId("icon").parentElement?.nextSibling).toBe(avatar);
  });

  it("shows a spinner instead of icon / avatar and marks the tag busy while loading", () => {
    render(
      <Tag
        loading
        icon={<span data-testid="icon" />}
        avatar={<span data-testid="avatar" />}
      >
        Saving
      </Tag>,
    );
    const tag = getTag("Saving");
    expect(tag).toHaveClass("loading");
    expect(tag).toHaveAttribute("aria-busy", "true");
    expect(tag.querySelector(".spinner")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("avatar")).not.toBeInTheDocument();
  });

  it("blocks the action and hides the close button while loading", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { rerender } = render(
      <Tag clickable closable loading onClick={onClick}>
        T
      </Tag>,
    );
    const action = screen.getByRole("button", { name: "T" });
    expect(action).toBeDisabled();
    expect(
      screen.queryByRole("button", { name: "Close" }),
    ).not.toBeInTheDocument();
    await user.click(action);
    expect(onClick).not.toHaveBeenCalled();

    rerender(
      <Tag clickable closable onClick={onClick}>
        T
      </Tag>,
    );
    expect(getTag("T")).not.toHaveAttribute("aria-busy");
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("styles a pressed (selected) toggle tag and exposes aria-pressed=false", () => {
    const { rerender } = render(
      <Tag clickable pressed>
        Filter
      </Tag>,
    );
    expect(getTag("Filter")).toHaveClass("pressed");
    rerender(
      <Tag clickable pressed={false}>
        Filter
      </Tag>,
    );
    expect(getTag("Filter")).not.toHaveClass("pressed");
    expect(screen.getByRole("button", { name: "Filter" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("toggles a selectable filter tag with the keyboard", async () => {
    const user = userEvent.setup();
    const Filter = () => {
      const [on, setOn] = React.useState(false);
      return (
        <Tag clickable pressed={on} onClick={() => setOn((v) => !v)}>
          React
        </Tag>
      );
    };
    render(<Filter />);
    await user.tab();
    await user.keyboard(" ");
    expect(screen.getByRole("button", { name: "React" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await user.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "React" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("never emits undefined or stray whitespace in the class name", () => {
    render(<Tag>C</Tag>);
    const cls = getTag("C").getAttribute("class") ?? "";
    expect(cls).not.toMatch(/undefined|false/);
    expect(cls).toBe(cls.trim());
    expect(cls).not.toMatch(/\s{2,}/);
  });
});
