import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ConfirmProvider, useConfirm } from "./index";

// WAI-ARIA APG alertdialog: initial focus on the least destructive action,
// focus trapped, Escape cancels, focus returns to the invoking control.
function Ask({ onResult }: { onResult: (ok: boolean) => void }) {
  const confirm = useConfirm();
  return (
    <button
      type="button"
      onClick={async () =>
        onResult(await confirm({ title: "Delete book?", color: "danger" }))
      }
    >
      Delete book
    </button>
  );
}

const renderAsk = () => {
  const onResult = vi.fn();
  render(
    <ConfirmProvider>
      <Ask onResult={onResult} />
    </ConfirmProvider>,
  );
  return onResult;
};

const openWithKeyboard = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.tab();
  expect(screen.getByRole("button", { name: "Delete book" })).toHaveFocus();
  await user.keyboard("{Enter}");
  return screen.findByRole("alertdialog", { name: "Delete book?" });
};

describe("Confirm keyboard (APG alertdialog)", () => {
  it("focuses Cancel (the least destructive action) first and traps Tab / Shift+Tab", async () => {
    const user = userEvent.setup();
    renderAsk();
    await openWithKeyboard(user);
    const cancel = screen.getByRole("button", { name: "Cancel" });
    const remove = screen.getByRole("button", { name: "Delete" });
    const close = screen.getByRole("button", { name: "Close" });
    await waitFor(() => expect(cancel).toHaveFocus());
    await user.tab();
    expect(remove).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.tab();
    expect(cancel).toHaveFocus();
    await user.tab({ shift: true });
    expect(close).toHaveFocus();
  });

  it("Enter on the confirm button resolves true and returns focus to the invoker", async () => {
    const user = userEvent.setup();
    const onResult = renderAsk();
    await openWithKeyboard(user);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus(),
    );
    await user.tab();
    await user.keyboard("{Enter}");
    await waitFor(() => expect(onResult).toHaveBeenCalledWith(true));
    expect(onResult).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Delete book" })).toHaveFocus(),
    );
  });

  it("Enter on the initially focused Cancel resolves false", async () => {
    const user = userEvent.setup();
    const onResult = renderAsk();
    await openWithKeyboard(user);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus(),
    );
    await user.keyboard("{Enter}");
    await waitFor(() => expect(onResult).toHaveBeenCalledWith(false));
  });

  it("Escape resolves false and returns focus to the invoker", async () => {
    const user = userEvent.setup();
    const onResult = renderAsk();
    await openWithKeyboard(user);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(onResult).toHaveBeenCalledWith(false));
    await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Delete book" })).toHaveFocus(),
    );
  });
});
