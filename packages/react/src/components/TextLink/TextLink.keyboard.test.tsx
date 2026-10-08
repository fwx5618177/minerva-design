// Keyboard audit: a native link is a tab stop and Enter follows it (no Space).
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TextLink } from ".";

describe("TextLink keyboard", () => {
  it("is reachable with Tab and activated with Enter only", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn((event: { preventDefault: () => void }) =>
      event.preventDefault(),
    );
    render(
      <TextLink href="/docs" variant="subtle" onClick={onClick}>
        Docs
      </TextLink>,
    );
    await user.tab();
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveFocus();
    await user.keyboard(" ");
    expect(onClick).not.toHaveBeenCalled();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("keeps the slotted element as the single tab stop with asChild", async () => {
    const user = userEvent.setup();
    render(
      <>
        <TextLink asChild>
          <a href="/routed">Routed</a>
        </TextLink>
        <button type="button">after</button>
      </>,
    );
    await user.tab();
    expect(screen.getByRole("link", { name: "Routed" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "after" })).toHaveFocus();
  });
});
