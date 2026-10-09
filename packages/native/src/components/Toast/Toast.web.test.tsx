import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ToastProvider, toast, toastQueue } from "./Toast";

afterEach(() => {
  act(() => toastQueue.reset());
});

describe("Toast (react-native-web)", () => {
  it("renders status / alert DOM nodes with live regions and hooks", () => {
    render(<ToastProvider />);
    act(() => {
      toast.info("Saved");
      toast.danger("Failed");
    });
    const status = screen.getByRole("status", { name: "Saved" });
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveAttribute("data-part", "content");
    const alert = screen.getByRole("alert", { name: "Failed" });
    expect(alert).toHaveAttribute("aria-live", "assertive");
    expect(
      screen.getByRole("region", { name: "Notifications" }),
    ).toHaveAttribute("data-part", "region");
  });

  it("the close button dismisses the toast", async () => {
    const onClose = vi.fn();
    render(<ToastProvider />);
    act(() => {
      toast("Bye", { onClose });
    });
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalled();
    await act(() => new Promise((r) => setTimeout(r, 300)));
    expect(screen.queryByRole("status")).toBeNull();
  });
});
