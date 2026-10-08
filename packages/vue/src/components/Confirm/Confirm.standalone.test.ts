// The tests share one module instance in order: once the standalone host is
// mounted lazily, later tests reuse it (that is the behaviour under test).
// The global test setup clears document.body after each test: the host is
// re-attached on the next call.
import { describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick } from "vue";
import { render, screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { ConfirmProvider, confirm, useConfirm } from ".";
import ConfigProvider from "../../config/ConfigProvider.vue";

const hosts = () => document.querySelectorAll("[data-confirm-host]");

describe("confirm() without <ConfirmProvider>", () => {
  it("lazily mounts a standalone dialog instead of falling back to window.confirm", async () => {
    const user = userEvent.setup();
    const warn = vi.spyOn(console, "warn");
    const nativeConfirm = vi.fn(() => true);
    vi.stubGlobal("confirm", nativeConfirm);
    expect(hosts()).toHaveLength(0);
    const result = confirm({
      title: "Delete book?",
      description: "This cannot be undone",
      color: "danger",
    });
    const dialog = await screen.findByRole("alertdialog", {
      name: "Delete book?",
    });
    expect(dialog).toHaveAccessibleDescription("This cannot be undone");
    expect(hosts()).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: "Delete" }));
    await expect(result).resolves.toBe(true);
    await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
    expect(warn).not.toHaveBeenCalled();
    expect(nativeConfirm).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
    warn.mockRestore();
  });

  it("reuses the same host for later calls and resolves false on cancel / Escape", async () => {
    const user = userEvent.setup();
    const cancelled = confirm({ title: "Leave page?", cancelLabel: "Stay" });
    await user.click(await screen.findByRole("button", { name: "Stay" }));
    await expect(cancelled).resolves.toBe(false);

    const escaped = confirm({ title: "Confirm again" });
    await screen.findByRole("alertdialog", { name: "Confirm again" });
    await new Promise((r) => setTimeout(r, 5));
    await user.keyboard("{Escape}");
    await expect(escaped).resolves.toBe(false);
    expect(hosts()).toHaveLength(1);
  });

  it("queues concurrent requests and shows them one at a time in call order", async () => {
    const user = userEvent.setup();
    const first = confirm({ title: "First" });
    const second = confirm({ title: "Second" });
    expect(await screen.findAllByRole("alertdialog")).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: "Confirm" }));
    await expect(first).resolves.toBe(true);
    await screen.findByRole("alertdialog", { name: "Second" });
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await expect(second).resolves.toBe(false);
  });

  it("useConfirm() works outside a provider by returning the global confirm", () => {
    let fn: unknown;
    render(
      defineComponent(() => {
        fn = useConfirm();
        return () => null;
      }),
    );
    expect(fn).toBe(confirm);
  });

  it("useConfirm() in a ConfigProvider scope without provider goes to the standalone host", async () => {
    const user = userEvent.setup();
    let ask!: ReturnType<typeof useConfirm>;
    const Probe = defineComponent(() => {
      ask = useConfirm();
      return () => null;
    });
    render(
      defineComponent(
        () => () =>
          h(ConfigProvider, { locale: { language: "fr" } }, () => h(Probe)),
      ),
    );
    const result = ask({ title: "Scoped" });
    await screen.findByRole("alertdialog", { name: "Scoped" });
    expect(hosts()).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: "Confirmer" }));
    await expect(result).resolves.toBe(true);
  });

  it("gives a mounted provider precedence over the existing standalone host", async () => {
    const user = userEvent.setup();
    // re-attach the host (the body was cleared after the previous test)
    const warm = confirm({ title: "Warm" });
    await user.click(await screen.findByRole("button", { name: "Confirm" }));
    await warm;
    expect(hosts()).toHaveLength(1);
    render(ConfirmProvider, {
      slots: { default: () => h("main", { "data-testid": "app" }) },
    });
    await nextTick();
    const result = confirm({ title: "Provider first" });
    expect(await screen.findAllByRole("alertdialog")).toHaveLength(1);
    expect(hosts()[0]).toBeEmptyDOMElement();
    await user.click(screen.getByRole("button", { name: "Confirm" }));
    await expect(result).resolves.toBe(true);
  });
});
