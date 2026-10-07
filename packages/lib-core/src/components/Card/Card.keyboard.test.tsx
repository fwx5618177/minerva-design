// Keyboard audit: a plain card is not a tab stop; interactive cards rendered
// as native buttons / links get native keyboard activation.
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Card } from ".";

describe("Card keyboard", () => {
  it("is not a tab stop by default, even when interactive", async () => {
    const user = userEvent.setup();
    render(<Card interactive>Static</Card>);
    await user.tab();
    expect(document.body).toHaveFocus();
  });

  it("as a button: Tab reaches it and Enter / Space activate it", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Card as="button" interactive onClick={onClick}>
        Pick plan
      </Card>,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "Pick plan" })).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("as a disabled button: skipped by Tab", async () => {
    const user = userEvent.setup();
    render(
      <Card as="button" disabled>
        Pick plan
      </Card>,
    );
    await user.tab();
    expect(document.body).toHaveFocus();
  });

  it("as a link: Tab reaches it and Enter follows it", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn((event: { preventDefault: () => void }) =>
      event.preventDefault(),
    );
    render(
      <Card as="a" href="/plans" interactive onClick={onClick}>
        Plans
      </Card>,
    );
    await user.tab();
    expect(screen.getByRole("link", { name: "Plans" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledOnce();
  });
});
