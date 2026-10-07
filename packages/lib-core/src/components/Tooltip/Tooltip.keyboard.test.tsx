import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Tooltip from "./Tooltip";
import { Modal } from "../Modal";

// WAI-ARIA APG tooltip: shown on keyboard focus, dismissed with Escape
// (WCAG 1.4.13) without affecting an enclosing dialog, hidden on blur.
describe("Tooltip keyboard inside a Modal", () => {
  it("Escape hides only the tooltip; a second Escape closes the Modal", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange} title="Settings">
        <input aria-label="Name" />
        <Tooltip content="Saves the draft">
          <button type="button">Save</button>
        </Tooltip>
      </Modal>,
    );
    const name = screen.getByRole("textbox", { name: "Name" });
    await waitFor(() => expect(name).toHaveFocus());
    await user.tab();
    const save = screen.getByRole("button", { name: "Save" });
    expect(save).toHaveFocus();
    const tooltip = await screen.findByRole("tooltip");
    expect(save).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining(tooltip.id),
    );

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(save).toHaveFocus();
    expect(
      screen.getByRole("dialog", { name: "Settings" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("hides on blur when Tab moves on inside the Modal", async () => {
    const user = userEvent.setup();
    render(
      <Modal open title="Settings">
        <Tooltip content="Saves the draft">
          <button type="button">Save</button>
        </Tooltip>
        <input aria-label="Name" />
      </Modal>,
    );
    const save = screen.getByRole("button", { name: "Save" });
    await waitFor(() => expect(save).toHaveFocus());
    await screen.findByRole("tooltip");
    await user.tab();
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus();
    await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());
  });
});
