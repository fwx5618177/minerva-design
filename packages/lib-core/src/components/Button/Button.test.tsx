import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders children inside a button with default classes", () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      "customButton",
      "primary",
      "variant-solid",
      "medium",
    );
    expect(button).not.toHaveClass("borderRadiusMedium");
    expect(button).toBeEnabled();
  });

  it("applies color, variant, size, shape, active and custom className", () => {
    render(
      <Button
        color="danger"
        variant="outline"
        size="xlarge"
        shape="circle"
        active
        className="extra"
      >
        Delete
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveClass(
      "danger",
      "variant-outline",
      "xlarge",
      "circle",
      "active",
      "extra",
    );
    expect(button).not.toHaveClass("primary", "variant-solid");
  });

  it("maps named borderRadius values to classes", () => {
    render(<Button borderRadius="none">Flat</Button>);

    expect(screen.getByRole("button")).toHaveClass("borderRadiusNone");
  });

  it("applies numeric borderRadius as inline style merged with style prop", () => {
    render(
      <Button borderRadius={12} style={{ color: "red" }}>
        Rounded
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveStyle({ borderRadius: "12px", color: "red" });
    expect(button).not.toHaveClass("borderRadiusMedium");
  });

  it("uses aria-label as the accessible name", () => {
    render(<Button aria-label="Close dialog">x</Button>);

    expect(
      screen.getByRole("button", { name: "Close dialog" }),
    ).toBeInTheDocument();
  });

  it("calls onClick with the click event", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);

    await user.click(screen.getByRole("button", { name: "Go" }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toHaveProperty("type", "click");
  });

  it("activates via keyboard (Enter and Space)", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);

    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("is disabled and does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Go
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders a spinner and disables the button while loading", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { container } = render(
      <Button onClick={onClick} loading>
        Submitting
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Submitting" });
    expect(button).toHaveClass("loading");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(container.querySelector(".loadingSpinner")).toBeInTheDocument();

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("forwards extra HTML attributes and the ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Button ref={ref} type="submit" data-testid="btn">
        Send
      </Button>,
    );

    const button = screen.getByTestId("btn");
    expect(button).toHaveAttribute("type", "submit");
    expect(ref.current).toBe(button);
  });

  describe("type", () => {
    it('defaults to type="button"', () => {
      render(<Button>Save</Button>);
      expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute(
        "type",
        "button",
      );
    });

    it("does not submit the surrounding form by default (click or Enter)", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
      const onClick = vi.fn();
      render(
        <form onSubmit={onSubmit}>
          <input aria-label="Name" />
          <Button onClick={onClick}>Preview</Button>
        </form>,
      );
      const button = screen.getByRole("button", { name: "Preview" });
      await user.click(button);
      button.focus();
      await user.keyboard("{Enter}");
      expect(onClick).toHaveBeenCalledTimes(2);
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('submits the form when type="submit" is explicit', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
      render(
        <form onSubmit={onSubmit}>
          <Button>Cancel</Button>
          <Button type="submit">Send</Button>
        </form>,
      );
      await user.click(screen.getByRole("button", { name: "Cancel" }));
      expect(onSubmit).not.toHaveBeenCalled();
      await user.click(screen.getByRole("button", { name: "Send" }));
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('resets the form with type="reset"', async () => {
      const user = userEvent.setup();
      render(
        <form>
          <input aria-label="Name" defaultValue="" />
          <Button type="reset">Reset</Button>
        </form>,
      );
      const input = screen.getByRole("textbox", { name: "Name" });
      await user.type(input, "Ada");
      await user.click(screen.getByRole("button", { name: "Reset" }));
      expect(input).toHaveValue("");
    });
  });

  describe("regressions", () => {
    it("does not set a redundant role or tabindex", () => {
      render(<Button>Save</Button>);
      const button = screen.getByRole("button", { name: "Save" });
      expect(button).not.toHaveAttribute("role");
      expect(button).not.toHaveAttribute("tabindex");
    });

    it("never emits undefined or stray whitespace in the class name", () => {
      render(<Button>Save</Button>);
      const cls = screen.getByRole("button").getAttribute("class") ?? "";
      expect(cls).not.toMatch(/undefined|false|\n/);
      expect(cls).toBe(cls.trim());
      expect(cls).not.toMatch(/\s{2,}/);
    });

    it("keeps focus and reports busy while loading, without activating", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
      const { rerender } = render(
        <form onSubmit={onSubmit}>
          <Button type="submit" onClick={onClick}>
            Save
          </Button>
        </form>,
      );
      const button = screen.getByRole("button", { name: "Save" });
      button.focus();
      rerender(
        <form onSubmit={onSubmit}>
          <Button type="submit" onClick={onClick} loading>
            Save
          </Button>
        </form>,
      );
      expect(button).toHaveFocus();
      expect(button).toHaveAttribute("aria-busy", "true");
      expect(button).toHaveAttribute("aria-disabled", "true");
      await user.click(button);
      await user.keyboard("{Enter}");
      expect(onClick).not.toHaveBeenCalled();
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it("accepts a callback ref and cleans it up on unmount", () => {
      const ref = vi.fn();
      const { unmount } = render(<Button ref={ref}>Save</Button>);
      expect(ref.mock.lastCall?.[0]).toBe(screen.getByRole("button"));
      unmount();
      expect(ref.mock.lastCall?.[0]).toBeNull();
    });
  });
});
