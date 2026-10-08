import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ToastProvider, toast } from ".";
import { toastStore } from "./store";

afterEach(() => {
  toastStore.reset();
});

const show = (fn: () => void) => act(fn);

describe("Toast keyboard", () => {
  it("does not steal focus when a toast appears", async () => {
    const user = userEvent.setup();
    render(
      <>
        <input aria-label="Search" />
        <ToastProvider />
      </>,
    );
    const input = screen.getByRole("textbox", { name: "Search" });
    await user.click(input);
    await user.keyboard("ab");
    show(() => {
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
    render(<ToastProvider />);
    show(() => {
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
    render(<ToastProvider />);
    let id: string | number = "";
    show(() => {
      id = toast.success("Saved", { duration: 0, onClose });
    });
    await user.tab();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    await user.keyboard(key);
    expect(onClose).toHaveBeenCalledExactlyOnceWith(id);
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "closed");
  });

  it("runs the action with Space and closes the toast", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<ToastProvider />);
    show(() => {
      toast.info("Deleted", {
        duration: 0,
        closable: false,
        action: { label: "Undo", onClick },
      });
    });
    await user.tab();
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "closed");
  });

  it("ignores other keys on the toast buttons", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ToastProvider />);
    show(() => {
      toast.info("Kept", { duration: 0, onClose });
    });
    await user.tab();
    await user.keyboard("{ArrowDown}a{Tab}");
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "open");
  });
});
