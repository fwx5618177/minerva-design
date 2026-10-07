// Ported from novel-isr-ui Confirm/__test__/Confirm.standalone.test.tsx.
// The tests share one module instance in order: once the standalone host is
// mounted lazily, later tests reuse it (that is the behaviour under test).
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ConfirmProvider, confirm, useConfirm } from "./index";
import type { ConfirmOptions } from "./index";

function hosts() {
  return document.querySelectorAll("[data-ui-confirm-host]");
}

/** Starts confirm() inside act and wraps the promise (so awaiting does not wait for the answer). */
async function ask(options: ConfirmOptions) {
  let result!: Promise<boolean>;
  await act(async () => {
    result = confirm(options);
  });
  return { result };
}

describe("confirm() without <ConfirmProvider>", () => {
  it("lazily mounts a standalone dialog instead of warning or falling back to window.confirm", async () => {
    const warn = vi.spyOn(console, "warn");
    const nativeConfirm = vi.fn(() => true);
    vi.stubGlobal("confirm", nativeConfirm);
    expect(hosts()).toHaveLength(0);

    const { result } = await ask({
      title: "Delete book?",
      description: "This cannot be undone",
      intent: "danger",
    });
    const dialog = await screen.findByRole("dialog", { name: "Delete book?" });
    expect(dialog).toHaveAccessibleDescription("This cannot be undone");
    expect(hosts()).toHaveLength(1);

    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    await expect(result).resolves.toBe(true);
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(warn).not.toHaveBeenCalled();
    expect(nativeConfirm).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
    warn.mockRestore();
  });

  it("reuses the same host for later calls and resolves false on cancel / Escape", async () => {
    const { result: cancelled } = await ask({
      title: "Leave page?",
      cancelLabel: "Stay",
    });
    await userEvent.click(await screen.findByRole("button", { name: "Stay" }));
    await expect(cancelled).resolves.toBe(false);

    const { result: escaped } = await ask({ title: "Confirm again" });
    await screen.findByRole("dialog", { name: "Confirm again" });
    await userEvent.keyboard("{Escape}");
    await expect(escaped).resolves.toBe(false);
    expect(hosts()).toHaveLength(1);
  });

  it("queues concurrent requests and shows them one at a time in call order", async () => {
    const { result: first } = await ask({ title: "First" });
    const { result: second } = await ask({ title: "Second" });
    expect(await screen.findAllByRole("dialog")).toHaveLength(1);
    await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    await expect(first).resolves.toBe(true);
    await screen.findByRole("dialog", { name: "Second" });
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await expect(second).resolves.toBe(false);
  });

  it("re-attaches the host when the page body was replaced", async () => {
    for (const host of hosts()) host.remove();
    const { result } = await ask({ title: "Remount" });
    await screen.findByRole("dialog", { name: "Remount" });
    expect(hosts()).toHaveLength(1);
    await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    await expect(result).resolves.toBe(true);
  });

  it("useConfirm() works outside a provider by returning the global confirm", () => {
    function Probe() {
      return <span>{useConfirm() === confirm ? "global" : "scoped"}</span>;
    }
    render(<Probe />);
    expect(screen.getByText("global")).toBeInTheDocument();
  });

  it("gives a mounted provider precedence over the existing standalone host without double rendering", async () => {
    expect(hosts()).toHaveLength(1);
    render(
      <ConfirmProvider>
        <main data-testid="app" />
      </ConfirmProvider>,
    );
    const { result } = await ask({ title: "Provider first" });
    const dialogs = await screen.findAllByRole("dialog");
    expect(dialogs).toHaveLength(1);
    // The provider's dialog is not in the standalone host's tree: its container stays empty.
    expect(hosts()[0]).toBeEmptyDOMElement();
    await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    await expect(result).resolves.toBe(true);
  });
});
