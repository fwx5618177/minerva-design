import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Modal, ModalBody, ModalFooter } from "./index";

// WAI-ARIA APG dialog (modal) pattern: keyboard-only open, initial focus,
// Tab / Shift+Tab cycling inside, Escape closing with focus return.
const Fixture = () => (
  <>
    <button type="button">Before</button>
    <Modal
      title="Edit profile"
      trigger={<button type="button">Open profile</button>}
    >
      <ModalBody>
        <input aria-label="Name" />
      </ModalBody>
      <ModalFooter>
        <button type="button">Save</button>
      </ModalFooter>
    </Modal>
  </>
);

const trigger = () => screen.getByRole("button", { name: "Open profile" });

describe("Modal keyboard (APG dialog)", () => {
  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])(
    "the trigger is Tab reachable and %s opens it, focusing the first tabbable",
    async (_, keys) => {
      const user = userEvent.setup();
      render(<Fixture />);
      await user.tab();
      await user.tab();
      expect(trigger()).toHaveFocus();
      await user.keyboard(keys);
      expect(
        screen.getByRole("dialog", { name: "Edit profile" }),
      ).toBeInTheDocument();
      await waitFor(() =>
        expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus(),
      );
    },
  );

  it("Tab wraps from the last to the first tabbable and Shift+Tab back", async () => {
    const user = userEvent.setup();
    render(<Fixture />);
    trigger().focus();
    await user.keyboard("{Enter}");
    const name = screen.getByRole("textbox", { name: "Name" });
    const save = screen.getByRole("button", { name: "Save" });
    // The close button is rendered last in the dialog.
    const close = screen.getByRole("button", { name: "Close" });
    await waitFor(() => expect(name).toHaveFocus());
    await user.tab();
    expect(save).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.tab();
    expect(name).toHaveFocus();
    await user.tab({ shift: true });
    expect(close).toHaveFocus();
    await user.tab({ shift: true });
    expect(save).toHaveFocus();
  });

  it("Escape closes and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Fixture />);
    trigger().focus();
    await user.keyboard("{Enter}");
    await waitFor(() =>
      expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus(),
    );
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(trigger()).toHaveFocus());
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("Enter on the close button closes and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Fixture />);
    trigger().focus();
    await user.keyboard("{Enter}");
    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    await user.keyboard("{Enter}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(trigger()).toHaveFocus());
  });

  it("focuses the dialog itself when it has no tabbable content", async () => {
    const user = userEvent.setup();
    render(
      <Modal
        title="Notice"
        hideCloseButton
        trigger={<button type="button">Show notice</button>}
      >
        <ModalBody>Read only text</ModalBody>
      </Modal>,
    );
    screen.getByRole("button", { name: "Show notice" }).focus();
    await user.keyboard("{Enter}");
    const dialog = screen.getByRole("dialog", { name: "Notice" });
    await waitFor(() => expect(dialog).toHaveFocus());
    // Tab cannot escape a dialog without tabbables.
    await user.tab();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
  });
});
