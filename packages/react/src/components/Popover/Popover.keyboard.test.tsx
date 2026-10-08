import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Popover, PopoverContent, PopoverTrigger } from "./index";

// Non-modal dialog popover: keyboard open, initial focus inside, Escape
// returns focus to the trigger.
const Fixture = () => (
  <>
    <button type="button">Before</button>
    <Popover>
      <PopoverTrigger>Sort</PopoverTrigger>
      <PopoverContent aria-label="Sort options">
        <button type="button">Newest</button>
        <button type="button">Oldest</button>
      </PopoverContent>
    </Popover>
    <button type="button">After</button>
  </>
);

const trigger = () => screen.getByRole("button", { name: "Sort" });

describe("Popover keyboard", () => {
  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])(
    "opens from the Tab-reachable trigger with %s and focuses the first tabbable",
    async (_, keys) => {
      const user = userEvent.setup();
      render(<Fixture />);
      await user.tab();
      await user.tab();
      expect(trigger()).toHaveFocus();
      await user.keyboard(keys);
      expect(trigger()).toHaveAttribute("aria-expanded", "true");
      expect(
        screen.getByRole("dialog", { name: "Sort options" }),
      ).toBeInTheDocument();
      await waitFor(() =>
        expect(screen.getByRole("button", { name: "Newest" })).toHaveFocus(),
      );
    },
  );

  it("Escape closes from inside the panel and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Fixture />);
    trigger().focus();
    await user.keyboard("{Enter}");
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Newest" })).toHaveFocus(),
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "Oldest" })).toHaveFocus();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(trigger()).toHaveFocus();
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  const openFromKeyboard = async (user: ReturnType<typeof userEvent.setup>) => {
    trigger().focus();
    await user.keyboard("{Enter}");
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Newest" })).toHaveFocus(),
    );
  };

  it("Tab past the last tabbable closes the panel and moves focus after the trigger", async () => {
    const user = userEvent.setup();
    render(<Fixture />);
    await openFromKeyboard(user);
    await user.tab();
    expect(screen.getByRole("button", { name: "Oldest" })).toHaveFocus();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.tab();
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    // focus is not pulled back to the trigger afterwards
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
  });

  it("Shift+Tab before the first tabbable closes the panel and moves focus before the trigger", async () => {
    const user = userEvent.setup();
    render(<Fixture />);
    await openFromKeyboard(user);
    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Before" })).toHaveFocus();
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(screen.getByRole("button", { name: "Before" })).toHaveFocus();
  });

  it("modal: Tab and Shift+Tab loop inside the panel", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button type="button">Before</button>
        <Popover modal>
          <PopoverTrigger>Sort</PopoverTrigger>
          <PopoverContent aria-label="Sort options">
            <button type="button">Newest</button>
            <button type="button">Oldest</button>
          </PopoverContent>
        </Popover>
        <button type="button">After</button>
      </>,
    );
    await openFromKeyboard(user);
    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: "Newest" })).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Oldest" })).toHaveFocus();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
