import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Alert from "./Alert";

describe("Alert", () => {
  it("renders title and content with role alert", () => {
    render(<Alert title="Heads up">Something happened</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Heads up");
    expect(alert).toHaveTextContent("Something happened");
  });

  it("applies default variant, size and type", () => {
    render(<Alert>Body</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-variant", "info");
    expect(alert).toHaveAttribute("data-size", "medium");
    expect(alert).toHaveAttribute("data-type", "default");
    expect(alert).toHaveClass(
      "alert",
      "info",
      "medium",
      "rounded",
      "withIcon",
      "withAnimation",
      "animation-slideIn",
    );
  });

  it.each(["info", "success", "warning", "error"] as const)(
    "renders %s variant with a labelled icon",
    (variant) => {
      render(<Alert variant={variant}>Body</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass(variant);
      expect(alert).toHaveAttribute("data-variant", variant);
      expect(
        screen.getByRole("img", { name: `${variant} icon` }),
      ).toBeInTheDocument();
    },
  );

  it("applies size, type and boolean style props", () => {
    render(
      <Alert
        size="large"
        type="outlined"
        outlined
        filled
        banner
        elevation
        rounded={false}
        className="custom"
      >
        Body
      </Alert>,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-size", "large");
    expect(alert).toHaveAttribute("data-type", "outlined");
    expect(alert).toHaveClass(
      "large",
      "outlined",
      "filled",
      "banner",
      "withElevation",
      "custom",
    );
    expect(alert).not.toHaveClass("rounded");
  });

  it("hides the icon when showIcon is false", () => {
    render(<Alert showIcon={false}>Body</Alert>);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).not.toHaveClass("withIcon");
  });

  it("renders a custom icon", () => {
    render(<Alert icon={<span data-testid="custom-icon" />}>Body</Alert>);
    expect(screen.getByRole("img", { name: "info icon" })).toContainElement(
      screen.getByTestId("custom-icon"),
    );
  });

  it("disables animation classes when animation is false", () => {
    render(
      <Alert animation={false} animationName="zoom">
        Body
      </Alert>,
    );
    const alert = screen.getByRole("alert");
    expect(alert).not.toHaveClass("withAnimation");
    expect(alert).not.toHaveClass("animation-zoom");
  });

  it("uses the given animation name", () => {
    render(<Alert animationName="bounce">Body</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("animation-bounce");
  });

  it("merges style and borderRadius", () => {
    render(
      <Alert style={{ color: "red" }} borderRadius={12}>
        Body
      </Alert>,
    );
    const alert = screen.getByRole("alert");
    expect(alert.style.color).toBe("red");
    expect(alert.style.borderRadius).toBe("12px");
  });

  it("renders the action area", () => {
    render(<Alert action={<button type="button">Undo</button>}>Body</Alert>);
    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
  });

  it("does not render a close button unless closable", () => {
    render(<Alert>Body</Alert>);
    expect(
      screen.queryByRole("button", { name: "Close" }),
    ).not.toBeInTheDocument();
  });

  it("closes and calls onClose with the click event", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Alert closable onClose={onClose}>
        Body
      </Alert>,
    );
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose.mock.calls[0][0]).toHaveProperty("type", "click");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("closes via keyboard activation", async () => {
    const user = userEvent.setup();
    render(<Alert closable>Body</Alert>);
    screen.getByRole("button", { name: "Close" }).focus();
    await user.keyboard("{Enter}");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders a custom close icon", () => {
    render(
      <Alert closable closeIcon={<span data-testid="x" />}>
        Body
      </Alert>,
    );
    expect(screen.getByRole("button", { name: "Close" })).toContainElement(
      screen.getByTestId("x"),
    );
  });

  describe("collapsible", () => {
    it("toggles content and aria-expanded, calling onExpand", async () => {
      const user = userEvent.setup();
      const onExpand = vi.fn();
      render(
        <Alert title="Title" collapsible onExpand={onExpand}>
          Details
        </Alert>,
      );
      const toggle = screen.getByRole("button", { name: "Collapse" });
      expect(toggle).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("Details")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveClass("collapsible", "expanded");

      await user.click(toggle);
      expect(onExpand).toHaveBeenLastCalledWith(false);
      expect(screen.queryByText("Details")).not.toBeInTheDocument();
      const expandBtn = screen.getByRole("button", { name: "Expand" });
      expect(expandBtn).toHaveAttribute("aria-expanded", "false");
      expect(screen.getByRole("alert")).not.toHaveClass("expanded");

      await user.click(expandBtn);
      expect(onExpand).toHaveBeenLastCalledWith(true);
      expect(onExpand).toHaveBeenCalledTimes(2);
      expect(screen.getByText("Details")).toBeInTheDocument();
    });

    it("respects defaultExpanded=false", () => {
      render(
        <Alert title="Title" collapsible defaultExpanded={false}>
          Details
        </Alert>,
      );
      expect(screen.queryByText("Details")).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Expand" })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });

    it("calls onExpand exactly once per toggle under StrictMode", async () => {
      const user = userEvent.setup();
      const onExpand = vi.fn();
      render(
        <React.StrictMode>
          <Alert title="Title" collapsible onExpand={onExpand}>
            Details
          </Alert>
        </React.StrictMode>,
      );
      await user.click(screen.getByRole("button", { name: "Collapse" }));
      expect(onExpand).toHaveBeenCalledTimes(1);
      expect(onExpand).toHaveBeenCalledWith(false);
    });

    it("does not render a toggle without a title", () => {
      render(<Alert collapsible>Details</Alert>);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });
});
