import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Alert from "./Alert";

const queryAlert = () =>
  screen.queryByRole("alert") ?? screen.queryByRole("status");

describe("Alert keyboard", () => {
  it("is not a tab stop itself and reaches toggle, action and close in order", async () => {
    const user = userEvent.setup();
    render(
      <Alert
        title="Update available"
        collapsible
        closable
        action={<button type="button">Install</button>}
      >
        Details
      </Alert>,
    );
    expect(queryAlert()).not.toHaveAttribute("tabindex");
    await user.tab();
    expect(screen.getByRole("button", { name: "Collapse" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Install" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
  });

  it("closes with Space and calls onClose", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Alert closable onClose={onClose}>
        Body
      </Alert>,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    await user.keyboard(" ");
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(queryAlert()).not.toBeInTheDocument();
  });

  it("toggles the collapsible content with Enter and Space, keeping focus and aria-expanded in sync", async () => {
    const user = userEvent.setup();
    const onExpand = vi.fn();
    render(
      <Alert title="Title" collapsible onExpand={onExpand}>
        Hidden details
      </Alert>,
    );
    await user.tab();
    const toggle = screen.getByRole("button", { name: "Collapse" });
    expect(toggle).toHaveFocus();
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Enter}");
    expect(onExpand).toHaveBeenLastCalledWith(false);
    expect(screen.queryByText("Hidden details")).not.toBeInTheDocument();
    // Same element: focus is not lost when the label changes
    expect(toggle).toHaveFocus();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAccessibleName("Expand");

    await user.keyboard(" ");
    expect(onExpand).toHaveBeenLastCalledWith(true);
    expect(screen.getByText("Hidden details")).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveFocus();
  });

  it("forwards className, style and aria-* attributes to the root", () => {
    render(
      <Alert
        className="custom"
        style={{ marginTop: 3 }}
        aria-describedby="hint"
        aria-live="off"
      >
        Body
      </Alert>,
    );
    const alert = queryAlert()!;
    expect(alert).toHaveClass("custom");
    expect(alert).toHaveStyle({ marginTop: "3px" });
    expect(alert).toHaveAttribute("aria-describedby", "hint");
    expect(alert).toHaveAttribute("aria-live", "off");
  });
});
