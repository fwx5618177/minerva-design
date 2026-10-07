// Keyboard audit: format button then textarea in tab order, Enter / Space
// format, syntax feedback appears after Tab leaves the field.
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { JsonField } from ".";

describe("JsonField keyboard", () => {
  it("reaches the format button and the textarea with Tab and formats with Enter / Space", async () => {
    const user = userEvent.setup();
    render(<JsonField aria-label="Payload" defaultValue='{"a":1}' />);
    await user.tab();
    const format = screen.getByRole("button", { name: "Format JSON" });
    expect(format).toHaveFocus();
    await user.keyboard("{Enter}");
    const field = screen.getByRole("textbox", { name: "Payload" });
    expect(field).toHaveValue('{\n  "a": 1\n}');
    await user.keyboard(" ");
    expect(field).toHaveValue('{\n  "a": 1\n}');
    await user.tab();
    expect(field).toHaveFocus();
  });

  it("reports a syntax error once Tab leaves the textarea", async () => {
    const user = userEvent.setup();
    render(<JsonField aria-label="Payload" hideToolbar />);
    await user.tab();
    const field = screen.getByRole("textbox", { name: "Payload" });
    expect(field).toHaveFocus();
    await user.keyboard("{{");
    expect(field).not.toHaveAttribute("aria-invalid", "true");
    await user.tab();
    expect(field).toHaveAttribute("aria-invalid", "true");
  });

  it("skips the textarea and the format button when disabled", async () => {
    const user = userEvent.setup();
    render(<JsonField aria-label="Payload" defaultValue="{}" disabled />);
    await user.tab();
    expect(document.body).toHaveFocus();
  });
});
