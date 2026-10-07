import { StrictMode } from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ConfirmDialog, ConfirmProvider, confirm, useConfirm } from "./index";
import i18n from "../../config/i18n";

function hosts() {
  return document.querySelectorAll("[data-confirm-host]");
}

function DeleteButton({ onResult }: { onResult: (ok: boolean) => void }) {
  const ask = useConfirm();
  return (
    <button
      type="button"
      onClick={async () =>
        onResult(await ask({ title: "Delete comment?", color: "danger" }))
      }
    >
      Delete comment
    </button>
  );
}

describe("ConfirmDialog (declarative)", () => {
  it("is an alertdialog labelled by its title and described by its description", () => {
    render(
      <ConfirmDialog
        open
        onOpenChange={() => {}}
        onConfirm={() => {}}
        title="Delete chapter?"
        description="This cannot be undone"
        color="danger"
      />,
    );
    const dialog = screen.getByRole("alertdialog");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    const titleId = dialog.getAttribute("aria-labelledby");
    const descriptionId = dialog.getAttribute("aria-describedby");
    expect(document.getElementById(titleId ?? "")).toHaveTextContent(
      "Delete chapter?",
    );
    expect(document.getElementById(descriptionId ?? "")).toHaveTextContent(
      "This cannot be undone",
    );
    expect(screen.getByRole("button", { name: "Delete" })).toHaveClass(
      "danger",
    );
  });

  it("renders title/description and wires cancel + confirm buttons", async () => {
    const onOpenChange = vi.fn();
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        open
        onOpenChange={onOpenChange}
        onConfirm={onConfirm}
        title="Publish chapter"
        description="Readers will see it"
        confirmLabel="Publish"
        closeLabel="Dismiss"
      />,
    );
    const dialog = screen.getByRole("alertdialog", { name: "Publish chapter" });
    expect(dialog).toHaveAccessibleDescription("Readers will see it");
    expect(dialog).toHaveClass("small");
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    await userEvent.click(screen.getByRole("button", { name: "Publish" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Publish" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("defaults the confirm label by color and locks cancel while loading", () => {
    const noop = () => {};
    const { rerender } = render(
      <ConfirmDialog
        open
        onOpenChange={noop}
        onConfirm={noop}
        title="A"
        color="danger"
      />,
    );
    const del = screen.getByRole("button", { name: "Delete" });
    expect(del).toHaveClass("danger", "variant-solid");
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveClass(
      "neutral",
      "variant-outline",
    );
    rerender(
      <ConfirmDialog
        open
        onOpenChange={noop}
        onConfirm={noop}
        title="A"
        color="warning"
      />,
    );
    expect(screen.getByRole("button", { name: "Confirm" })).toHaveClass(
      "warning",
    );
    rerender(
      <ConfirmDialog open onOpenChange={noop} onConfirm={noop} title="A" />,
    );
    expect(screen.getByRole("button", { name: "Confirm" })).toHaveClass(
      "primary",
      "variant-solid",
    );
    rerender(
      <ConfirmDialog
        open
        onOpenChange={noop}
        onConfirm={noop}
        title="A"
        loading
      />,
    );
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
    const busy = screen.getByRole("button", { name: "Confirm" });
    expect(busy).toHaveAttribute("aria-busy", "true");
    expect(busy).not.toBeDisabled();
    rerender(
      <ConfirmDialog
        open
        onOpenChange={noop}
        onConfirm={noop}
        title="A"
        loading
        confirmDisabled
      />,
    );
    expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled();
  });

  it("localizes the default labels", async () => {
    await act(() => i18n.changeLanguage("zh"));
    try {
      const noop = () => {};
      render(
        <ConfirmDialog
          open
          onOpenChange={noop}
          onConfirm={noop}
          title="A"
          color="danger"
        />,
      );
      expect(screen.getByRole("button", { name: "删除" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "取消" })).toBeInTheDocument();
    } finally {
      await act(() => i18n.changeLanguage("en"));
    }
  });
});

describe("<ConfirmProvider>", () => {
  it("routes useConfirm() and global confirm() through the provider; no standalone host is created", async () => {
    const results: boolean[] = [];
    render(
      <StrictMode>
        <ConfirmProvider>
          <DeleteButton onResult={(ok) => results.push(ok)} />
        </ConfirmProvider>
      </StrictMode>,
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Delete comment" }),
    );
    await userEvent.click(
      await screen.findByRole("button", { name: "Delete" }),
    );
    await waitFor(() => expect(results).toEqual([true]));

    let pending!: Promise<boolean>;
    await act(async () => {
      pending = confirm({ title: "Global call" });
    });
    await screen.findByRole("alertdialog", { name: "Global call" });
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await expect(pending).resolves.toBe(false);
    expect(hosts()).toHaveLength(0);
  });

  it("resolves pending requests as cancelled when the provider unmounts", async () => {
    const { unmount } = render(
      <ConfirmProvider>
        <span />
      </ConfirmProvider>,
    );
    let pending!: Promise<boolean>;
    await act(async () => {
      pending = confirm({ title: "Unfinished" });
    });
    await screen.findByRole("alertdialog", { name: "Unfinished" });
    unmount();
    await expect(pending).resolves.toBe(false);
  });

  it("nested providers: the most recently mounted wins and unmounting it falls back to the outer one", async () => {
    function Inner({ show }: { show: boolean }) {
      return show ? (
        <ConfirmProvider>
          <section aria-label="inner" />
        </ConfirmProvider>
      ) : null;
    }
    const { rerender } = render(
      <ConfirmProvider>
        <Inner show />
      </ConfirmProvider>,
    );
    rerender(
      <ConfirmProvider>
        <Inner show={false} />
      </ConfirmProvider>,
    );
    let pending!: Promise<boolean>;
    await act(async () => {
      pending = confirm({ title: "Outer" });
    });
    await screen.findByRole("alertdialog", { name: "Outer" });
    await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    await expect(pending).resolves.toBe(true);
    expect(hosts()).toHaveLength(0);
  });

  it("ignores a second settle of the same request (double click)", async () => {
    render(
      <ConfirmProvider>
        <span />
      </ConfirmProvider>,
    );
    let first!: Promise<boolean>;
    let second!: Promise<boolean>;
    await act(async () => {
      first = confirm({ title: "First" });
      second = confirm({ title: "Second" });
    });
    const ok = await screen.findByRole("button", { name: "Confirm" });
    await act(async () => {
      ok.click();
      ok.click();
    });
    await expect(first).resolves.toBe(true);
    await screen.findByRole("alertdialog", { name: "Second" });
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await expect(second).resolves.toBe(false);
  });
});
