// Focus management and keyboard (port of the React Toast.focus.test.tsx and
// Toast.keyboard.test.tsx): focus moves to the next toast / back to where it
// came from when a toast closes, Escape dismisses the focused toast, the
// provider hotkey (F8 by default) jumps to the toast region.
import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, type VNodeChild } from "vue";
import { mount } from "@vue/test-utils";
import { screen, within } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { ToastProvider, toast, useToast } from ".";
import { toastStore } from "./store";
import { moveFocusFromToast } from "./parts";
import ConfigProvider from "../../config/ConfigProvider.vue";

afterEach(() => {
  toastStore.reset();
});

const flush = async () => {
  await nextTick();
  await nextTick();
};

const renderTree = async (render: () => VNodeChild) => {
  const wrapper = mount(defineComponent({ setup: () => render }), {
    attachTo: document.body,
  });
  await flush();
  return wrapper;
};

const show = async (fn: () => void) => {
  fn();
  await flush();
};

const toastOf = (text: string) =>
  screen.getByText(text).closest<HTMLElement>("[role=status], [role=alert]")!;

describe("Toast focus management", () => {
  it("moves focus to the next toast's close button after closing one", async () => {
    const user = userEvent.setup();
    await renderTree(() => h(ToastProvider));
    await show(() => {
      toast.info("First", { duration: 0 });
      toast.info("Second", { duration: 0 });
    });
    await user.tab();
    const firstClose = within(toastOf("First")).getByRole("button", {
      name: "Close",
    });
    expect(firstClose).toHaveFocus();
    await user.keyboard("{Enter}");
    await flush();
    expect(toastOf("First")).toHaveAttribute("data-state", "closed");
    expect(
      within(toastOf("Second")).getByRole("button", { name: "Close" }),
    ).toHaveFocus();
  });

  it("moves focus to the previous toast when the last one closes", async () => {
    const user = userEvent.setup();
    await renderTree(() => h(ToastProvider));
    await show(() => {
      toast.info("First", {
        duration: 0,
        closable: false,
        action: { label: "Act", onClick: () => {} },
      });
      toast.info("Second", { duration: 0 });
    });
    within(toastOf("Second")).getByRole("button", { name: "Close" }).focus();
    await user.keyboard("{Enter}");
    await flush();
    // no close button: its first tabbable
    expect(
      within(toastOf("First")).getByRole("button", { name: "Act" }),
    ).toHaveFocus();
  });

  it("returns focus to the element focused before entering the region once the last toast closes", async () => {
    const user = userEvent.setup();
    await renderTree(() =>
      h(ToastProvider, null, () => h("button", { type: "button" }, "Save")),
    );
    await show(() => {
      toast.info("Saved", {
        duration: 0,
        action: { label: "Undo", onClick: () => {} },
      });
    });
    const save = screen.getByRole("button", { name: "Save" });
    await user.click(save);
    await user.tab();
    expect(screen.getByRole("button", { name: "Undo" })).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Undo" }));
    expect(save).toHaveFocus();
    expect(document.activeElement).not.toBe(document.body);
  });

  it("falls back to the nearest tabbable outside the region", async () => {
    const user = userEvent.setup();
    await renderTree(() => [
      h(ToastProvider),
      h("button", { type: "button" }, "Outside"),
    ]);
    await show(() => toast.info("Alone", { duration: 0 }));
    within(toastOf("Alone")).getByRole("button", { name: "Close" }).focus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "Outside" })).toHaveFocus();
  });

  it("never drops focus to body when nothing else can take it", async () => {
    const user = userEvent.setup();
    await renderTree(() => h(ToastProvider));
    await show(() => toast.info("Alone", { duration: 0 }));
    await user.tab();
    await user.keyboard(" ");
    expect(document.activeElement).not.toBe(document.body);
    expect(screen.getByRole("region")).toHaveFocus();
    // leaving the region drops its tabindex
    screen.getByRole("region").blur();
    expect(screen.getByRole("region")).not.toHaveAttribute("tabindex");
  });

  it("does nothing for a detached toast", () => {
    const el = document.createElement("div");
    expect(() =>
      moveFocusFromToast(el, {
        getReturnFocus: () => null,
        setReturnFocus: () => {},
        registerViewport: () => {},
      }),
    ).not.toThrow();
  });

  it("dismisses only the focused toast with Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    await renderTree(() => h(ToastProvider));
    let id: string | number = "";
    await show(() => {
      id = toast.info("First", { duration: 0, onClose });
      toast.info("Second", { duration: 0 });
    });
    await user.tab();
    await user.keyboard("{Escape}");
    await flush();
    expect(onClose).toHaveBeenCalledExactlyOnceWith(id);
    expect(toastOf("First")).toHaveAttribute("data-state", "closed");
    expect(toastOf("Second")).toHaveAttribute("data-state", "open");
    expect(
      within(toastOf("Second")).getByRole("button", { name: "Close" }),
    ).toHaveFocus();
    // Escape on a closing toast does nothing more
    toastOf("First").dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("focuses the region with F8, labels it with the hotkey and gives focus back", async () => {
    const user = userEvent.setup();
    await renderTree(() =>
      h(ToastProvider, null, () => h("input", { "aria-label": "Search" })),
    );
    await show(() => toast.info("Synced", { duration: 0 }));
    const region = screen.getByRole("region", { name: "Notifications (F8)" });
    expect(region).not.toHaveAttribute("tabindex");
    const input = screen.getByRole("textbox", { name: "Search" });
    await user.click(input);
    await user.keyboard("{F8}");
    expect(region).toHaveFocus();
    expect(region).toHaveAttribute("tabindex", "-1");
    await user.tab();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(input).toHaveFocus();
    expect(region).not.toHaveAttribute("tabindex");
  });

  it("does nothing on the hotkey while there is no toast", async () => {
    const user = userEvent.setup();
    await renderTree(() =>
      h(ToastProvider, null, () => h("input", { "aria-label": "Search" })),
    );
    const input = screen.getByRole("textbox", { name: "Search" });
    await user.click(input);
    await user.keyboard("{F8}");
    expect(input).toHaveFocus();
  });

  it("supports a custom hotkey combination, shown in the label", async () => {
    const user = userEvent.setup();
    await renderTree(() => h(ToastProvider, { hotkey: ["altKey", "KeyT"] }));
    await show(() => toast.info("Custom", { duration: 0 }));
    const region = screen.getByRole("region", {
      name: "Notifications (Alt+T)",
    });
    await user.keyboard("{F8}");
    expect(region).not.toHaveFocus();
    await user.keyboard("{Alt>}t{/Alt}");
    expect(region).toHaveFocus();
  });

  it("uses the plain label and disables the hotkey with an empty array", async () => {
    const user = userEvent.setup();
    await renderTree(() => h(ToastProvider, { hotkey: [] }));
    await show(() => toast.info("Quiet", { duration: 0 }));
    const region = screen.getByRole("region", { name: "Notifications" });
    await user.keyboard("{F8}");
    expect(region).not.toHaveFocus();
  });

  it("focuses the first viewport holding toasts when toasts are scoped", async () => {
    const user = userEvent.setup();
    const Notify = defineComponent({
      setup() {
        const scoped = useToast();
        return () =>
          h(
            "button",
            {
              type: "button",
              onClick: () => scoped.success("Scoped saved", { duration: 0 }),
            },
            "scoped",
          );
      },
    });
    await renderTree(() =>
      h(ConfigProvider, { theme: "light", locale: { language: "en" } }, () =>
        h(ToastProvider, null, () =>
          h(ConfigProvider, { theme: "dark", locale: { language: "zh" } }, () =>
            h(Notify),
          ),
        ),
      ),
    );
    await user.click(screen.getByRole("button", { name: "scoped" }));
    await flush();
    const scopedRegion =
      toastOf("Scoped saved").closest<HTMLElement>("[role=region]")!;
    expect(scopedRegion).toHaveAccessibleName("通知（F8）");
    await user.keyboard("{F8}");
    expect(scopedRegion).toHaveFocus();
  });
});

describe("Toast keyboard", () => {
  it("does not steal focus when a toast appears", async () => {
    const user = userEvent.setup();
    await renderTree(() => [
      h("input", { "aria-label": "Search" }),
      h(ToastProvider),
    ]);
    const input = screen.getByRole("textbox", { name: "Search" });
    await user.click(input);
    await user.keyboard("ab");
    await show(() => {
      toast.danger("Failed", {
        duration: 0,
        action: { label: "Retry", onClick: () => {} },
      });
    });
    expect(screen.getByRole("alert")).toHaveTextContent("Failed");
    expect(input).toHaveFocus();
    await user.keyboard("c");
    expect(input).toHaveValue("abc");
  });

  it("is reachable with Tab: action first, then close; the region itself is not a tab stop", async () => {
    const user = userEvent.setup();
    await renderTree(() => h(ToastProvider));
    await show(() => {
      toast.info("Archived", {
        duration: 0,
        action: { label: "Undo", onClick: () => {} },
      });
    });
    expect(screen.getByRole("region")).not.toHaveAttribute("tabindex");
    expect(screen.getByRole("status")).not.toHaveAttribute("tabindex");
    await user.tab();
    expect(screen.getByRole("button", { name: "Undo" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
  });

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])("closes with %s on the close button", async (_, key) => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    await renderTree(() => h(ToastProvider));
    let id: string | number = "";
    await show(() => {
      id = toast.success("Saved", { duration: 0, onClose });
    });
    await user.tab();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    await user.keyboard(key);
    await flush();
    expect(onClose).toHaveBeenCalledExactlyOnceWith(id);
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "closed");
  });

  it("runs the action with Space and closes the toast", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    await renderTree(() => h(ToastProvider));
    await show(() => {
      toast.info("Deleted", {
        duration: 0,
        closable: false,
        action: { label: "Undo", onClick },
      });
    });
    await user.tab();
    await user.keyboard(" ");
    await flush();
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "closed");
  });

  it("ignores other keys on the toast buttons", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    await renderTree(() => h(ToastProvider));
    await show(() => {
      toast.info("Kept", { duration: 0, onClose });
    });
    await user.tab();
    await user.keyboard("{ArrowDown}a{Tab}");
    await flush();
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "open");
  });
});
