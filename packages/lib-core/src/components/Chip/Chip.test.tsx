import React, { StrictMode, createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import Chip from "./Chip";

const getChip = (label: string) =>
  screen.getByText(label).closest(".chip") as HTMLElement;

describe("Chip", () => {
  it("renders the label with default classes and no button role", () => {
    render(<Chip label="React" />);
    const chip = getChip("React");
    expect(chip).toHaveClass("chip", "filled", "default", "medium");
    expect(chip).not.toHaveAttribute("role");
    expect(chip).not.toHaveAttribute("tabindex");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("forwards the ref to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Chip ref={ref} label="React" />);
    expect(ref.current).toBe(getChip("React"));
  });

  it.each(["outlined", "soft"] as const)(
    "applies the %s variant class",
    (variant) => {
      render(<Chip label="C" variant={variant} />);
      expect(getChip("C")).toHaveClass(variant);
    },
  );

  it.each([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "info",
  ] as const)("applies the %s color class", (color) => {
    render(<Chip label="C" color={color} />);
    expect(getChip("C")).toHaveClass(color);
  });

  it.each(["small", "large"] as const)("applies the %s size class", (size) => {
    render(<Chip label="C" size={size} />);
    expect(getChip("C")).toHaveClass(size);
  });

  it("applies selected, disabled and custom className", () => {
    render(<Chip label="C" selected disabled className="mine" />);
    expect(getChip("C")).toHaveClass("selected", "disabled", "mine");
  });

  it("renders icon and avatar", () => {
    render(
      <Chip
        label="C"
        icon={<span data-testid="icon" />}
        avatar={<span data-testid="avatar" />}
      />,
    );
    const chip = getChip("C");
    expect(chip).toContainElement(screen.getByTestId("icon"));
    expect(chip).toContainElement(screen.getByTestId("avatar"));
  });

  it("is a focusable button and calls onClick when clickable", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Chip label="C" clickable onClick={onClick} />);
    const chip = screen.getByRole("button", { name: "C" });
    expect(chip.tagName).toBe("BUTTON");
    expect(getChip("C")).toHaveClass("clickable");

    await user.tab();
    expect(chip).toHaveFocus();

    await user.click(chip);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toHaveProperty("type", "click");
  });

  it("does not call onClick when not clickable", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Chip label="C" onClick={onClick} />);
    await user.click(getChip("C"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not call onClick or take focus when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Chip label="C" clickable disabled onClick={onClick} />);
    const chip = screen.getByRole("button", { name: "C" });
    expect(chip).toBeDisabled();
    await user.click(chip);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("calls onDelete without triggering onClick", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    const onClick = vi.fn();
    render(
      <Chip
        label="C"
        clickable
        onClick={onClick}
        onDelete={onDelete}
        deleteIcon={<span data-testid="del" />}
      />,
    );
    await user.click(screen.getByTestId("del"));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete.mock.calls[0][0]).toHaveProperty("type", "click");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders the default delete icon only when onDelete is provided", () => {
    const { container, rerender } = render(<Chip label="C" />);
    expect(container.querySelector(".deleteIcon")).not.toBeInTheDocument();
    rerender(<Chip label="C" onDelete={vi.fn()} />);
    expect(container.querySelector(".deleteIcon svg")).toBeInTheDocument();
  });

  it("hides the delete icon when disabled or loading", () => {
    const { container, rerender } = render(
      <Chip label="C" disabled onDelete={vi.fn()} />,
    );
    expect(container.querySelector(".deleteIcon")).not.toBeInTheDocument();
    rerender(<Chip label="C" loading onDelete={vi.fn()} />);
    expect(container.querySelector(".deleteIcon")).not.toBeInTheDocument();
  });

  it("shows a progress indicator and hides icons while loading", () => {
    render(
      <Chip
        label="C"
        loading
        icon={<span data-testid="icon" />}
        avatar={<span data-testid="avatar" />}
      />,
    );
    expect(getChip("C")).toHaveClass("loading");
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("avatar")).not.toBeInTheDocument();
  });

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])(
    "calls onClick when %s is pressed on a focused clickable chip",
    async (_, key) => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Chip label="C" clickable onClick={onClick} />);
      await user.tab();
      expect(screen.getByRole("button", { name: "C" })).toHaveFocus();
      await user.keyboard(key);
      expect(onClick).toHaveBeenCalledTimes(1);
    },
  );

  it("ignores Enter/Space when not clickable or disabled", async () => {
    const onClick = vi.fn();
    const { rerender } = render(<Chip label="C" onClick={onClick} />);
    const user = userEvent.setup();
    getChip("C").focus();
    await user.keyboard("{Enter} ");

    rerender(<Chip label="C" clickable disabled onClick={onClick} />);
    const chip = screen.getByRole("button", { name: "C" });
    expect(chip).toBeDisabled();
    chip.focus();
    await user.keyboard("{Enter} ");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders the delete control as a labelled native button", () => {
    render(<Chip label="React" onDelete={vi.fn()} />);
    const del = screen.getByRole("button", { name: "Remove React" });
    expect(del.tagName).toBe("BUTTON");
    expect(del).toHaveAttribute("type", "button");
    expect(del).toHaveClass("deleteIcon");
  });

  it("uses deleteLabel as the delete button's accessible name", () => {
    render(<Chip label="React" deleteLabel="Delete tag" onDelete={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: "Delete tag" }),
    ).toBeInTheDocument();
  });

  it("calls onDelete from the delete button without triggering onClick", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    const onClick = vi.fn();
    render(<Chip label="C" clickable onClick={onClick} onDelete={onDelete} />);
    await user.click(screen.getByRole("button", { name: "Remove C" }));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])(
    "activates the delete button with %s without triggering onClick",
    async (_, key) => {
      const user = userEvent.setup();
      const onDelete = vi.fn();
      const onClick = vi.fn();
      render(
        <Chip label="C" clickable onClick={onClick} onDelete={onDelete} />,
      );
      await user.tab();
      await user.tab();
      expect(screen.getByRole("button", { name: "Remove C" })).toHaveFocus();
      await user.keyboard(key);
      expect(onDelete).toHaveBeenCalledTimes(1);
      expect(onClick).not.toHaveBeenCalled();
    },
  );

  it("never emits undefined or stray whitespace in the class name", () => {
    render(<Chip label="C" />);
    const cls = getChip("C").getAttribute("class") ?? "";
    expect(cls).not.toMatch(/undefined|false/);
    expect(cls).toBe(cls.trim());
    expect(cls).not.toMatch(/\s{2,}/);
  });

  describe("clickable + deletable (no nested interactive elements)", () => {
    it("renders the action and the delete control as sibling buttons", () => {
      render(<Chip label="C" clickable onClick={vi.fn()} onDelete={vi.fn()} />);
      const chip = getChip("C");
      expect(chip).not.toHaveAttribute("role");
      expect(chip).not.toHaveAttribute("tabindex");
      const action = screen.getByRole("button", { name: "C" });
      const del = screen.getByRole("button", { name: "Remove C" });
      expect(action.tagName).toBe("BUTTON");
      expect(action.parentElement).toBe(chip);
      expect(del.parentElement).toBe(chip);
      for (const el of screen.getAllByRole("button")) {
        expect(el.parentElement?.closest("button, [role='button']")).toBeNull();
      }
    });

    it("reaches both buttons with Tab and activates each independently", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const onDelete = vi.fn();
      render(
        <StrictMode>
          <Chip label="C" clickable onClick={onClick} onDelete={onDelete} />
        </StrictMode>,
      );
      await user.tab();
      expect(screen.getByRole("button", { name: "C" })).toHaveFocus();
      await user.keyboard("{Enter}");
      await user.keyboard(" ");
      expect(onClick).toHaveBeenCalledTimes(2);
      await user.tab();
      expect(screen.getByRole("button", { name: "Remove C" })).toHaveFocus();
      await user.keyboard("{Enter}");
      expect(onDelete).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it("exposes selected as aria-pressed on clickable chips", () => {
      const { rerender } = render(<Chip label="C" clickable selected />);
      expect(screen.getByRole("button", { name: "C" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      rerender(<Chip label="C" clickable selected={false} />);
      expect(screen.getByRole("button", { name: "C" })).toHaveAttribute(
        "aria-pressed",
        "false",
      );
      rerender(<Chip label="C" clickable />);
      expect(screen.getByRole("button", { name: "C" })).not.toHaveAttribute(
        "aria-pressed",
      );
    });
  });
});

describe("Chip localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });
  it("translates the delete label and lets deleteLabel win", () => {
    act(() => {
      i18n.changeLanguage("fr");
    });
    const { rerender } = render(<Chip label="React" onDelete={() => {}} />);
    expect(
      screen.getByRole("button", { name: "Retirer React" }),
    ).toBeInTheDocument();

    rerender(<Chip label="React" onDelete={() => {}} deleteLabel="Drop" />);
    expect(screen.getByRole("button", { name: "Drop" })).toBeInTheDocument();
  });
});
