// Closing an alert with its close button never drops focus to <body>.
import { createRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Alert from "./Alert";

describe("Alert focus after closing", () => {
  it("moves focus to the next focusable element after the alert (keyboard)", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button type="button">Before</button>
        <Alert closable>Body</Alert>
        <button type="button">After</button>
      </>,
    );
    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
  });

  it("moves focus to the next focusable element after a click", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Alert closable>Body</Alert>
        <a href="#next">Next link</a>
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.getByRole("link", { name: "Next link" })).toHaveFocus();
  });

  it("falls back to the previous focusable element", async () => {
    const user = userEvent.setup();
    render(
      <>
        <input aria-label="Name" />
        <Alert closable>Body</Alert>
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus();
  });

  it("falls back to its container rather than body", async () => {
    const user = userEvent.setup();
    render(
      <section aria-label="Notices">
        <Alert closable>Body</Alert>
      </section>,
    );
    await user.click(screen.getByRole("button", { name: "Close" }));
    const section = screen.getByRole("region", { name: "Notices" });
    expect(section).toHaveFocus();
    expect(document.activeElement).not.toBe(document.body);
  });

  it.each([
    ["an element", (el: HTMLElement) => el],
    [
      "a ref",
      (el: HTMLElement) => {
        const ref = createRef<HTMLElement>();
        (ref as { current: HTMLElement }).current = el;
        return ref;
      },
    ],
    ["a getter", (el: HTMLElement) => () => el],
  ])("focuses returnFocus given as %s", async (_, toTarget) => {
    const user = userEvent.setup();
    const { rerender } = render(
      <>
        <button type="button">Trigger</button>
        <Alert closable>Body</Alert>
        <button type="button">After</button>
      </>,
    );
    const trigger = screen.getByRole("button", { name: "Trigger" });
    rerender(
      <>
        <button type="button">Trigger</button>
        <Alert closable returnFocus={toTarget(trigger)}>
          Body
        </Alert>
        <button type="button">After</button>
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(trigger).toHaveFocus();
  });

  it("respects a focus move made by onClose", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn(() => screen.getByRole("textbox").focus());
    render(
      <>
        <input aria-label="Target" />
        <Alert closable onClose={onClose}>
          Body
        </Alert>
        <button type="button">After</button>
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("textbox", { name: "Target" })).toHaveFocus();
  });

  it("still moves focus when the parent unmounts the alert in onClose", async () => {
    const user = userEvent.setup();
    function Page() {
      const [shown, setShown] = useState(true);
      return (
        <>
          {shown && (
            <Alert closable onClose={() => setShown(false)}>
              Body
            </Alert>
          )}
          <button type="button">After</button>
        </>
      );
    }
    render(<Page />);
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByText("Body")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
  });
});
