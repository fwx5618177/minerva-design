import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "./index";

// WAI-ARIA APG dialog (modal) pattern applied to the side drawer.
const Fixture = () => (
  <>
    <button type="button">Before</button>
    <DrawerRoot>
      <DrawerTrigger>Filters</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>Filter books</DrawerHeader>
        <DrawerBody>
          <input aria-label="Author" />
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose>Apply</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
    <button type="button">After</button>
  </>
);

const trigger = () => screen.getByRole("button", { name: "Filters" });

describe("Drawer keyboard (APG dialog)", () => {
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
      expect(
        screen.getByRole("dialog", { name: "Filter books" }),
      ).toHaveAttribute("aria-modal", "true");
      await waitFor(() =>
        expect(screen.getByRole("textbox", { name: "Author" })).toHaveFocus(),
      );
    },
  );

  it("cycles Tab / Shift+Tab inside the drawer", async () => {
    const user = userEvent.setup();
    render(<Fixture />);
    trigger().focus();
    await user.keyboard("{Enter}");
    const author = screen.getByRole("textbox", { name: "Author" });
    const apply = screen.getByRole("button", { name: "Apply" });
    const close = screen.getByRole("button", { name: "Close" });
    await waitFor(() => expect(author).toHaveFocus());
    await user.tab();
    expect(apply).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.tab();
    expect(author).toHaveFocus();
    await user.tab({ shift: true });
    expect(close).toHaveFocus();
  });

  it("Escape closes and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Fixture />);
    trigger().focus();
    await user.keyboard("{Enter}");
    await waitFor(() =>
      expect(screen.getByRole("textbox", { name: "Author" })).toHaveFocus(),
    );
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(trigger()).toHaveFocus());
  });

  it("activating a DrawerClose with the keyboard returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Fixture />);
    trigger().focus();
    await user.keyboard("{Enter}");
    await user.tab();
    expect(screen.getByRole("button", { name: "Apply" })).toHaveFocus();
    await user.keyboard(" ");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(trigger()).toHaveFocus());
  });
});
