// Keyboard sanity: Tab reaches the textarea, Enter inserts a newline, and a
// disabled textarea is skipped.
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Textarea } from ".";

describe("Textarea keyboard", () => {
  it("is reachable with Tab and keeps Enter as a newline", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Bio" />);
    await user.tab();
    const field = screen.getByRole("textbox", { name: "Bio" });
    expect(field).toHaveFocus();
    await user.keyboard("a{Enter}b");
    expect(field).toHaveValue("a\nb");
  });

  it("is skipped when disabled", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Textarea aria-label="Off" disabled />
        <Textarea aria-label="On" />
      </>,
    );
    await user.tab();
    expect(screen.getByRole("textbox", { name: "On" })).toHaveFocus();
  });
});
