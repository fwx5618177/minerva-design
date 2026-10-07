// The toast API driven from a small app: a save flow that turns a loading
// toast into a success, promise tracking, a queue limited by ToastProvider
// max, pause on hover, an action button, manual close and dismiss.
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  Button,
  ConfigProvider,
  ToastProvider,
  toast,
  type ToastProviderProps,
} from "@minerva/lib-core";

const toastTitles = () =>
  Array.from(
    document.body.querySelectorAll<HTMLElement>(
      '[role="region"] [role="status"], [role="region"] [role="alert"]',
    ),
  )
    .filter((el) => el.dataset.state === "open")
    .map((el) => el.textContent?.trim())
    .filter(Boolean);

const SaveButton = () => {
  const handleSave = () => {
    const id = toast.loading("Saving…");
    setTimeout(() => {
      toast.update(id, {
        color: "success",
        loading: false,
        title: "Saved!",
        duration: 2000,
      });
    }, 500);
  };
  return <Button onClick={handleSave}>Save</Button>;
};

const UploadButton = ({ fail = false }: { fail?: boolean }) => (
  <Button
    onClick={() => {
      toast
        .promise(
          new Promise<number>((resolve, reject) =>
            setTimeout(
              () => (fail ? reject(new Error("offline")) : resolve(3)),
              800,
            ),
          ),
          {
            loading: "Uploading…",
            success: (count) => `${count} files uploaded`,
            error: (error) => `Upload failed: ${(error as Error).message}`,
          },
        )
        .catch(() => undefined);
    }}
  >
    Upload
  </Button>
);

const App = ({
  children,
  ...provider
}: ToastProviderProps & { children?: React.ReactNode }) => (
  <ConfigProvider theme="dark">
    <ToastProvider {...provider}>{children}</ToastProvider>
  </ConfigProvider>
);

describe("e2e: toast API", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(async () => {
    act(() => toast.dismiss());
    await act(() => vi.advanceTimersByTimeAsync(300));
    vi.useRealTimers();
  });

  const setup = () =>
    userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

  it("turns a loading toast into a success that closes by itself", async () => {
    const user = setup();
    render(
      <App>
        <SaveButton />
      </App>,
    );
    await user.click(screen.getByRole("button", { name: "Save" }));
    const item = await screen.findByRole("status");
    expect(item).toHaveTextContent("Saving…");

    await act(() => vi.advanceTimersByTimeAsync(500));
    expect(screen.getByRole("status")).toBe(item);
    expect(item).toHaveTextContent("Saved!");

    await act(() => vi.advanceTimersByTimeAsync(2300));
    await waitFor(() =>
      expect(screen.queryByText("Saved!")).not.toBeInTheDocument(),
    );
  });

  it("renders inside a scoped ConfigProvider's theme scope", async () => {
    render(
      <ConfigProvider theme="light">
        <ConfigProvider theme="dark">
          <ToastProvider />
        </ConfigProvider>
      </ConfigProvider>,
    );
    act(() => {
      toast.info("Themed", { duration: 0 });
    });
    const region = await screen.findByRole("region", { name: "Notifications" });
    expect(within(region).getByRole("status")).toHaveTextContent("Themed");
    // portalled into the scope's container, so the toast gets the dark theme
    expect(region.closest("[data-minerva-theme-scope]")).not.toBeNull();
    expect(region.parentElement).not.toBe(document.body);
  });

  it("follows a promise from loading to success or error", async () => {
    const user = setup();
    const { rerender } = render(
      <App>
        <UploadButton />
      </App>,
    );
    await user.click(screen.getByRole("button", { name: "Upload" }));
    expect(await screen.findByText("Uploading…")).toBeInTheDocument();
    await act(() => vi.advanceTimersByTimeAsync(800));
    expect(await screen.findByText("3 files uploaded")).toBeInTheDocument();
    expect(screen.queryByText("Uploading…")).not.toBeInTheDocument();

    rerender(
      <App>
        <UploadButton fail />
      </App>,
    );
    await user.click(screen.getByRole("button", { name: "Upload" }));
    await act(() => vi.advanceTimersByTimeAsync(800));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Upload failed: offline",
    );
  });

  it("pauses the countdown while hovered and resumes afterwards", async () => {
    const user = setup();
    render(<App />);
    act(() => {
      toast.info("Hover me", { duration: 1000 });
    });
    const item = await screen.findByRole("status");

    await act(() => vi.advanceTimersByTimeAsync(600));
    await user.hover(item);
    await act(() => vi.advanceTimersByTimeAsync(5000));
    expect(item).toHaveAttribute("data-state", "open");

    await user.unhover(item);
    // ~400ms were left when the pointer arrived
    await act(() => vi.advanceTimersByTimeAsync(500));
    await waitFor(() =>
      expect(screen.queryByText("Hover me")).not.toBeInTheDocument(),
    );
  });

  it("keeps at most max toasts, closing the oldest first", async () => {
    render(<App max={2} />);
    act(() => {
      toast.info("one", { duration: 0 });
      toast.warning("two", { duration: 0 });
      toast.danger("three", { duration: 0 });
    });
    await waitFor(() => expect(toastTitles()).toEqual(["two", "three"]));
    expect(screen.getByText("three").closest('[role="alert"]')).not.toBeNull();
  });

  it("runs an action, closes a toast with its close button and dismisses the rest", async () => {
    const user = setup();
    const onUndo = vi.fn();
    const onClose = vi.fn();
    render(<App />);
    act(() => {
      toast.success("Archived", {
        duration: 0,
        action: { label: "Undo", onClick: onUndo },
      });
      toast.info("Closable", { duration: 0, onClose });
      toast.info("Other", { duration: 0 });
    });

    await user.click(await screen.findByRole("button", { name: "Undo" }));
    expect(onUndo).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.queryByText("Archived")).not.toBeInTheDocument(),
    );

    const closable = screen
      .getByText("Closable")
      .closest<HTMLElement>('[role="status"]')!;
    await user.click(within(closable).getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(screen.queryByText("Closable")).not.toBeInTheDocument(),
    );
    expect(onClose).toHaveBeenCalledTimes(1);

    act(() => toast.dismiss());
    await waitFor(() => expect(toastTitles()).toEqual([]));
  });

  it("chains toasts with onClose", async () => {
    render(<App />);
    act(() => {
      toast.info("First", {
        duration: 1000,
        onClose: () =>
          toast.info("Second (after first closed)", { duration: 1000 }),
      });
    });
    expect(await screen.findByText("First")).toBeInTheDocument();
    expect(screen.queryByText(/Second/)).not.toBeInTheDocument();

    await act(() => vi.advanceTimersByTimeAsync(1300));
    expect(
      await screen.findByText("Second (after first closed)"),
    ).toBeInTheDocument();
    expect(screen.queryByText("First")).not.toBeInTheDocument();
  });
});
