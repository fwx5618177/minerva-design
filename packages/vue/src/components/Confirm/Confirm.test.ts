import { describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import { render, screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { ConfirmDialog, ConfirmProvider, confirm, useConfirm } from ".";
import { setLanguage } from "../../config/i18n";
import ConfigProvider from "../../config/ConfigProvider.vue";

const hosts = () => document.querySelectorAll("[data-confirm-host]");

const DeleteButton = defineComponent({
  props: { onResult: { type: Function, required: true } },
  setup(props) {
    const ask = useConfirm();
    return () =>
      h(
        "button",
        {
          type: "button",
          onClick: async () =>
            props.onResult(
              await ask({ title: "Delete comment?", color: "danger" }),
            ),
        },
        "Delete comment",
      );
  },
});

describe("ConfirmDialog (declarative)", () => {
  it("is an alertdialog labelled by its title and described by its description", async () => {
    render(ConfirmDialog, {
      props: {
        open: true,
        title: "Delete chapter?",
        description: "This cannot be undone",
        color: "danger",
      },
    });
    const dialog = await screen.findByRole("alertdialog");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("data-color", "danger");
    expect(
      document.getElementById(dialog.getAttribute("aria-labelledby") ?? ""),
    ).toHaveTextContent("Delete chapter?");
    expect(
      document.getElementById(dialog.getAttribute("aria-describedby") ?? ""),
    ).toHaveTextContent("This cannot be undone");
    expect(screen.getByRole("button", { name: "Delete" })).toHaveClass(
      "danger",
    );
  });

  it("renders title/description and wires cancel + confirm buttons", async () => {
    const user = userEvent.setup();
    const { emitted } = render(ConfirmDialog, {
      props: {
        open: true,
        title: "Publish chapter",
        description: "Readers will see it",
        confirmLabel: "Publish",
        closeLabel: "Dismiss",
      },
    });
    const dialog = await screen.findByRole("alertdialog", {
      name: "Publish chapter",
    });
    expect(dialog).toHaveAccessibleDescription("Readers will see it");
    expect(dialog).toHaveClass("small");
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(emitted("openChange")).toEqual([[false]]);
    expect(emitted("update:open")).toEqual([[false]]);
    await user.click(screen.getByRole("button", { name: "Publish" }));
    expect(emitted("confirm")).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Publish" })).toHaveAttribute(
      "type",
      "button",
    );
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(emitted("openChange")).toHaveLength(2);
  });

  it("accepts render functions and slots for its texts", async () => {
    render(ConfirmDialog, {
      props: {
        open: true,
        title: () => h("strong", "Rendered title"),
        cancelLabel: () => "Keep",
      },
      slots: {
        description: () => "Slotted description",
        "confirm-label": () => "Go",
        default: () => h("p", "Extra"),
      },
    });
    const dialog = await screen.findByRole("alertdialog", {
      name: "Rendered title",
    });
    expect(dialog).toHaveAccessibleDescription("Slotted description");
    expect(screen.getByRole("button", { name: "Keep" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go" })).toBeInTheDocument();
    expect(screen.getByText("Extra").parentElement).toHaveAttribute(
      "data-part",
      "body",
    );
  });

  it("defaults the confirm label by color and locks cancel while loading", async () => {
    const { rerender } = render(ConfirmDialog, {
      props: { open: true, title: "A", color: "danger" },
    });
    const del = await screen.findByRole("button", { name: "Delete" });
    expect(del).toHaveClass("danger", "variant-solid");
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveClass(
      "neutral",
      "variant-outline",
    );
    await rerender({ color: "warning" });
    expect(screen.getByRole("button", { name: "Confirm" })).toHaveClass(
      "warning",
    );
    await rerender({ color: "primary" });
    expect(screen.getByRole("button", { name: "Confirm" })).toHaveClass(
      "primary",
      "variant-solid",
    );
    await rerender({ loading: true });
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
    // the label is visibility: hidden behind the spinner
    const busy = screen
      .getByRole("alertdialog")
      .querySelector<HTMLElement>(
        '[data-part="footer"] [data-color="primary"]',
      )!;
    expect(busy).toHaveTextContent("Confirm");
    expect(busy).toHaveAttribute("aria-busy", "true");
    expect(busy).not.toBeDisabled();
    expect(screen.getByRole("alertdialog")).toHaveAttribute("data-loading", "");
    await rerender({ confirmDisabled: true });
    expect(busy).toBeDisabled();
  });

  it("localizes the default labels", async () => {
    setLanguage("zh");
    try {
      render(ConfirmDialog, {
        props: { open: true, title: "A", color: "danger" },
      });
      expect(
        await screen.findByRole("button", { name: "删除" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "取消" })).toBeInTheDocument();
    } finally {
      setLanguage("en");
    }
  });

  it("closes on Escape through v-model:open and restores focus", async () => {
    const user = userEvent.setup();
    const open = ref(false);
    render(
      defineComponent(() => () => [
        h(
          "button",
          { type: "button", onClick: () => (open.value = true) },
          "Ask",
        ),
        h(ConfirmDialog, {
          open: open.value,
          "onUpdate:open": (v: boolean) => (open.value = v),
          title: "Sure?",
        }),
      ]),
    );
    const opener = screen.getByRole("button", { name: "Ask" });
    await user.click(opener);
    const dialog = await screen.findByRole("alertdialog", { name: "Sure?" });
    await waitFor(() =>
      expect(dialog).toContainElement(document.activeElement as HTMLElement),
    );
    await new Promise((r) => setTimeout(r, 5));
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
    expect(open.value).toBe(false);
    await waitFor(() => expect(opener).toHaveFocus());
  });
});

describe("<ConfirmProvider>", () => {
  it("routes useConfirm() and global confirm() through the provider; no standalone host is created", async () => {
    const user = userEvent.setup();
    const results: boolean[] = [];
    render(
      defineComponent(
        () => () =>
          h(ConfirmProvider, null, () =>
            h(DeleteButton, { onResult: (ok: boolean) => results.push(ok) }),
          ),
      ),
    );
    await user.click(screen.getByRole("button", { name: "Delete comment" }));
    await user.click(await screen.findByRole("button", { name: "Delete" }));
    await waitFor(() => expect(results).toEqual([true]));

    const pending = confirm({ title: "Global call" });
    await screen.findByRole("alertdialog", { name: "Global call" });
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await expect(pending).resolves.toBe(false);
    expect(hosts()).toHaveLength(0);
  });

  it("resolves pending requests as cancelled when the provider unmounts", async () => {
    const { unmount } = render(ConfirmProvider, {
      slots: { default: () => h("span") },
    });
    await nextTick();
    const pending = confirm({ title: "Unfinished" });
    await screen.findByRole("alertdialog", { name: "Unfinished" });
    unmount();
    await expect(pending).resolves.toBe(false);
  });

  it("nested providers: the most recently mounted wins and unmounting it falls back to the outer one", async () => {
    const user = userEvent.setup();
    const show = ref(true);
    render(
      defineComponent(
        () => () =>
          h(ConfirmProvider, null, () =>
            show.value
              ? h(ConfirmProvider, null, () =>
                  h("section", { "aria-label": "inner" }),
                )
              : null,
          ),
      ),
    );
    await nextTick();
    show.value = false;
    await nextTick();
    const pending = confirm({ title: "Outer" });
    await screen.findByRole("alertdialog", { name: "Outer" });
    await user.click(screen.getByRole("button", { name: "Confirm" }));
    await expect(pending).resolves.toBe(true);
    expect(hosts()).toHaveLength(0);
  });

  it("ignores a second settle of the same request (double click)", async () => {
    const user = userEvent.setup();
    render(ConfirmProvider, { slots: { default: () => h("span") } });
    await nextTick();
    const first = confirm({ title: "First" });
    const second = confirm({ title: "Second" });
    const ok = await screen.findByRole("button", { name: "Confirm" });
    ok.click();
    ok.click();
    await expect(first).resolves.toBe(true);
    await screen.findByRole("alertdialog", { name: "Second" });
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await expect(second).resolves.toBe(false);
  });

  it("useConfirm() inside a scoped ConfigProvider renders in its scope and language", async () => {
    const user = userEvent.setup();
    const results: boolean[] = [];
    const onResult = vi.fn((ok: boolean) => results.push(ok));
    render(
      defineComponent(
        () => () =>
          h(ConfigProvider, { theme: "light" }, () =>
            h(ConfirmProvider, null, () =>
              h(
                ConfigProvider,
                { theme: "dark", locale: { language: "zh" } },
                () => h(DeleteButton, { onResult }),
              ),
            ),
          ),
      ),
    );
    await user.click(screen.getByRole("button", { name: "Delete comment" }));
    const dialog = await screen.findByRole("alertdialog", {
      name: "Delete comment?",
    });
    expect(dialog.closest("[data-minerva-theme-scope]")).not.toBeNull();
    await user.click(screen.getByRole("button", { name: "删除" }));
    await waitFor(() => expect(results).toEqual([true]));
  });

  it("useConfirm() returns the provider's function outside any ConfigProvider", () => {
    let fn: unknown;
    let global: unknown;
    const Probe = defineComponent(() => {
      fn = useConfirm();
      return () => null;
    });
    const Outside = defineComponent(() => {
      global = useConfirm();
      return () => null;
    });
    render(
      defineComponent(() => () => [
        h(ConfirmProvider, null, () => h(Probe)),
        h(Outside),
      ]),
    );
    expect(fn).not.toBe(confirm);
    expect(typeof fn).toBe("function");
    expect(global).toBe(confirm);
  });
});
