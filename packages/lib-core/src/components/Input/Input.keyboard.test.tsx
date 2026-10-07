// Keyboard sanity: Tab reaches the input and skips a disabled one.
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from ".";

describe("Input keyboard", () => {
  it("is reachable with Tab and skipped when disabled", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Input aria-label="Off" disabled />
        <Input aria-label="Name" />
      </>,
    );
    await user.tab();
    const field = screen.getByRole("textbox", { name: "Name" });
    expect(field).toHaveFocus();
    await user.keyboard("Ada");
    expect(field).toHaveValue("Ada");
  });
});
