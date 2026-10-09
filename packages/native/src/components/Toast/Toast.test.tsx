import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";
import { createToastQueue, resolveTokens } from "@minerva/core";
import type { ReactNode } from "react";
import { AccessibilityInfo, Text } from "react-native";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { Button } from "../Button";
import { queryPart } from "../../../test/queries";
import { ToastProvider, toast, toastQueue, useToast } from "./Toast";

const wait = (ms: number) =>
  act(() => new Promise<void>((r) => setTimeout(r, ms)));
const show = (fn: () => unknown) => act(async () => void fn());
const toasts = () => [
  ...screen.queryAllByRole("status"),
  ...screen.queryAllByRole("alert"),
];

afterEach(async () => {
  await act(async () => toastQueue.reset());
});

describe("Toast", () => {
  it("max caps the visible toasts, the oldest closes first (overflow)", async () => {
    const onClose = vi.fn();
    await render(<ToastProvider max={2} />);
    await show(() => toast.info("First", { duration: 0, onClose }));
    await show(() => toast.info("Second", { duration: 0 }));
    await show(() => toast.info("Third", { duration: 0 }));
    await wait(300);
    const shown = toasts();
    expect(shown).toHaveLength(2);
    expect(shown.map((el) => el.props.accessibilityLabel).sort()).toEqual([
      "Second",
      "Third",
    ]);
    expect(onClose).toHaveBeenCalledWith(expect.any(Number));
  });

  it("a status toast with icon and description, announced", async () => {
    const announce = vi.spyOn(AccessibilityInfo, "announceForAccessibility");
    await render(<ToastProvider />);
    await show(() =>
      toast.success("Saved", { description: "All changes stored" }),
    );
    const item = screen.getByRole("status", {
      name: "Saved. All changes stored",
    });
    expect(item.props.accessibilityLiveRegion).toBe("polite");
    expect(item).toHaveTextContent(/Saved/);
    expect(queryPart("icon", "toast")).toBeTruthy();
    expect(queryPart("root", "toast")?.props.dataSet).toMatchObject({
      color: "success",
      state: "open",
    });
    expect(announce).toHaveBeenCalledWith("Saved");
  });

  it.each(["danger", "warning"] as const)(
    "%s toasts are assertive alerts",
    async (color) => {
      await render(<ToastProvider />);
      await show(() => toast[color]("Failed"));
      expect(
        screen.getByRole("alert", { name: "Failed" }).props
          .accessibilityLiveRegion,
      ).toBe("assertive");
    },
  );

  it("toast(title, options) and toast(options) forms", async () => {
    await render(<ToastProvider />);
    await show(() => toast("Plain"));
    await show(() => toast({ title: "Object", color: "warning" }));
    expect(screen.getByRole("status", { name: "Plain" })).toBeTruthy();
    expect(screen.getByRole("alert", { name: "Object" })).toBeTruthy();
  });

  it("close button closes it (reason close-button) with onClose", async () => {
    const onClose = vi.fn();
    const close = vi.fn();
    const off = toastQueue.subscribeLifecycle((e) => {
      if (e.type === "close") close(e.reason);
    });
    const user = userEvent.setup();
    await render(<ToastProvider />);
    await show(() => toast("Bye", { onClose }));
    const button = screen.getByRole("button", { name: "Close" });
    expect(button.props.hitSlop).toEqual({
      top: 8,
      bottom: 8,
      left: 8,
      right: 8,
    });
    await user.press(button);
    expect(onClose).toHaveBeenCalled();
    expect(close).toHaveBeenCalledWith("close-button");
    await wait(300);
    expect(toasts()).toHaveLength(0);
    off();
  });

  it("not closable: no close button", async () => {
    await render(<ToastProvider />);
    await show(() => toast("Stay", { closable: false }));
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("action button runs and closes the toast", async () => {
    const onClick = vi.fn();
    await render(<ToastProvider />);
    await show(() => toast("Deleted", { action: { label: "Undo", onClick } }));
    await fireEvent.press(screen.getByRole("button", { name: "Undo" }));
    expect(onClick).toHaveBeenCalled();
    await wait(300);
    expect(toasts()).toHaveLength(0);
  });

  it("auto-closes after its duration; provider default duration", async () => {
    await render(<ToastProvider duration={100} />);
    await show(() => toast("Quick"));
    expect(toasts()).toHaveLength(1);
    await wait(450);
    expect(toasts()).toHaveLength(0);
  });

  it("pauses while pressed, resumes on release", async () => {
    await render(<ToastProvider />);
    let id: string | number = 0;
    await show(() => (id = toast("Hold", { duration: 150 })));
    await fireEvent(screen.getByRole("status"), "pressIn");
    expect(toastQueue.isPaused(id)).toBe(true);
    await wait(300);
    expect(toasts()).toHaveLength(1);
    await fireEvent(screen.getByRole("status"), "pressOut");
    expect(toastQueue.isPaused(id)).toBe(false);
    await wait(500);
    expect(toasts()).toHaveLength(0);
  });

  it("loading toast is busy, then updated to success; dismiss / dismissAll", async () => {
    await render(<ToastProvider />);
    let id: string | number = 0;
    await show(() => (id = toast.loading("Uploading")));
    expect(screen.getByRole("status", { name: "Uploading" })).toBeBusy();
    await show(() =>
      toast.update(id, { title: "Uploaded", loading: false, color: "success" }),
    );
    expect(screen.getByRole("status", { name: "Uploaded" })).not.toBeBusy();
    await show(() => toast.dismiss(id));
    await show(() => toast("A"));
    await show(() => toast("B"));
    await show(() => toast.dismissAll());
    await wait(300);
    expect(toasts()).toHaveLength(0);
  });

  it("promise: loading then success", async () => {
    await render(<ToastProvider />);
    let resolve: (v: string) => void = () => {};
    const p = new Promise<string>((r) => (resolve = r));
    await show(() =>
      toast.promise(p, {
        loading: "Saving",
        success: (v) => `Saved ${v}`,
        error: "Failed",
      }),
    );
    expect(screen.getByRole("status", { name: "Saving" })).toBeBusy();
    await act(async () => {
      resolve("doc");
      await p;
    });
    expect(screen.getByRole("status", { name: "Saved doc" })).toBeTruthy();
  });

  it("useToast() is bound to the provider's queue", async () => {
    const queue = createToastQueue<ReactNode>();
    function Trigger() {
      const api = useToast();
      return <Button onPress={() => api.info("Scoped")}>Go</Button>;
    }
    await render(
      <ToastProvider queue={queue}>
        <Trigger />
      </ToastProvider>,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Go" }));
    expect(screen.getByRole("status", { name: "Scoped" })).toBeTruthy();
    expect(queue.getState().toasts).toHaveLength(1);
    expect(toastQueue.getState().toasts).toHaveLength(0);
    await act(async () => queue.reset());
  });

  it("renders over its children; bottom position uses the bottom inset", async () => {
    await render(
      <MinervaProvider insets={{ top: 47, bottom: 34 }}>
        <ToastProvider position="bottom-center">
          <Text>App</Text>
        </ToastProvider>
      </MinervaProvider>,
    );
    expect(screen.getByText("App")).toBeTruthy();
    await show(() => toast("Hi"));
    const region = queryPart("region", "toast")!;
    expect(region.props.pointerEvents).toBe("box-none");
    expect(region.props.dataSet.position).toBe("bottom");
    expect(region).toHaveStyle({
      paddingBottom: 34 + 12,
      justifyContent: "flex-end",
    });
  });

  it.each(["top", "center"] as const)("%s position", async (position) => {
    await render(
      <MinervaProvider insets={{ top: 47 }}>
        <ToastProvider position={position} />
      </MinervaProvider>,
    );
    await show(() => toast("Hi"));
    expect(queryPart("region", "toast")).toHaveStyle({
      paddingTop: 47 + 12,
      justifyContent: position === "top" ? "flex-start" : "center",
    });
  });

  it("localized close label; custom close label; dark tokens", async () => {
    const dark = resolveTokens({ mode: "dark", design: { preset: "touch" } });
    const { rerender } = await render(
      <MinervaProvider theme="dark" locale={{ language: "zh" }}>
        <ToastProvider />
      </MinervaProvider>,
    );
    await show(() => toast("Hi"));
    expect(screen.getByRole("button", { name: "关闭" })).toBeTruthy();
    expect(queryPart("title", "toast")).toHaveStyle({
      color: dark.colors["text-color"],
    });
    await rerender(
      <MinervaProvider theme="dark" locale={{ language: "zh" }}>
        <ToastProvider closeLabel="Dismiss" />
      </MinervaProvider>,
    );
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeTruthy();
  });
});
