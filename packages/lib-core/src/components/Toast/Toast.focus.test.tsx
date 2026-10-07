// Focus management: focus moves to the next toast / back to where it came
// from when a toast closes, Escape dismisses the focused toast, and the
// provider hotkey (F8 by default) jumps to the toast region.
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ToastProvider, toast, useToast } from ".";
import { toastStore } from "./store";
import { ConfigProvider } from "../../contexts/ConfigProvider";

afterEach(() => {
  toastStore.reset();
});

const show = (fn: () => void) => act(fn);

const toastOf = (text: string) =>
  screen.getByText(text).closest<HTMLElement>("[role=status], [role=alert]")!;

describe("Toast focus management", () => {
  it("moves focus to the next toast's close button after closing one", async () => {
    const user = userEvent.setup();
    render(<ToastProvider />);
    show(() => {
      toast.info("First", { duration: 0 });
      toast.info("Second", { duration: 0 });
    });
    await user.tab();
    const firstClose = within(toastOf("First")).getByRole("button", {
      name: "Close",
    });
    expect(firstClose).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(toastOf("First")).toHaveAttribute("data-state", "closing");
    expect(
      within(toastOf("Second")).getByRole("button", { name: "Close" }),
    ).toHaveFocus();
  });

  it("returns focus to the element focused before entering the region once the last toast closes", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <button type="button">Save</button>
      </ToastProvider>,
    );
    show(() => {
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

  it("never drops focus to body when nothing else can take it", async () => {
    const user = userEvent.setup();
    render(<ToastProvider />);
    show(() => {
      toast.info("Alone", { duration: 0 });
    });
    await user.tab();
    await user.keyboard(" ");
    expect(document.activeElement).not.toBe(document.body);
    expect(screen.getByRole("region")).toHaveFocus();
  });

  it("dismisses only the focused toast with Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ToastProvider />);
    let id: string | number = "";
    show(() => {
      id = toast.info("First", { duration: 0, onClose });
      toast.info("Second", { duration: 0 });
    });
    await user.tab();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledExactlyOnceWith(id);
    expect(toastOf("First")).toHaveAttribute("data-state", "closing");
    expect(toastOf("Second")).toHaveAttribute("data-state", "open");
    expect(
      within(toastOf("Second")).getByRole("button", { name: "Close" }),
    ).toHaveFocus();
  });

  it("focuses the region with F8, labels it with the hotkey and gives focus back", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <input aria-label="Search" />
      </ToastProvider>,
    );
    show(() => {
      toast.info("Synced", { duration: 0 });
    });
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
    render(
      <ToastProvider>
        <input aria-label="Search" />
      </ToastProvider>,
    );
    const input = screen.getByRole("textbox", { name: "Search" });
    await user.click(input);
    await user.keyboard("{F8}");
    expect(input).toHaveFocus();
  });

  it("supports a custom hotkey combination, shown in the label", async () => {
    const user = userEvent.setup();
    render(<ToastProvider hotkey={["altKey", "KeyT"]} />);
    show(() => {
      toast.info("Custom", { duration: 0 });
    });
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
    render(<ToastProvider hotkey={[]} />);
    show(() => {
      toast.info("Quiet", { duration: 0 });
    });
    const region = screen.getByRole("region", { name: "Notifications" });
    await user.keyboard("{F8}");
    expect(region).not.toHaveFocus();
  });

  it("focuses the first viewport holding toasts when toasts are scoped", async () => {
    const user = userEvent.setup();
    function Notify() {
      const scoped = useToast();
      return (
        <button
          type="button"
          onClick={() => scoped.success("Scoped saved", { duration: 0 })}
        >
          scoped
        </button>
      );
    }
    render(
      <ConfigProvider theme="light" locale={{ language: "en" }}>
        <ToastProvider>
          <ConfigProvider theme="dark" locale={{ language: "zh" }}>
            <Notify />
          </ConfigProvider>
        </ToastProvider>
      </ConfigProvider>,
    );
    await user.click(screen.getByRole("button", { name: "scoped" }));
    const scopedRegion =
      toastOf("Scoped saved").closest<HTMLElement>("[role=region]")!;
    expect(scopedRegion).toHaveAccessibleName("通知（F8）");
    await user.keyboard("{F8}");
    expect(scopedRegion).toHaveFocus();
  });
});
