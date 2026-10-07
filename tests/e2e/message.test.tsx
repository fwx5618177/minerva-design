// The imperative Message API driven from a small app: a save flow that turns
// a loading message into a success, a queue limited by message.config, pause
// on hover, manual close and destroy.
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Button, message, useMessage } from "@minerva/lib-core";

const messageTexts = () =>
  Array.from(
    document.body.querySelectorAll<HTMLElement>(
      '[role="status"], [role="alert"]',
    ),
  )
    .map((el) => el.textContent?.trim())
    .filter(Boolean);

const SaveButton = () => {
  const handleSave = () => {
    const id = message.loading({ content: "Saving…", duration: 0 });
    setTimeout(() => {
      message.update(id, {
        type: "success",
        content: "Saved!",
        duration: 2000,
      });
    }, 500);
  };
  return <Button onClick={handleSave}>Save</Button>;
};

const Notifier = () => {
  const { info } = useMessage();
  return (
    <Button
      onClick={() => {
        void info({ content: "First", duration: 1000 }).then(() =>
          info({ content: "Second (after first closed)", duration: 1000 }),
        );
      }}
    >
      Chain
    </Button>
  );
};

describe("e2e: message API", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    act(() => message.destroy());
    message.config();
  });

  const setup = () =>
    userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

  it("turns a loading message into a success that closes by itself", async () => {
    const user = setup();
    render(<SaveButton />);
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(await screen.findByText("Saving…")).toBeInTheDocument();

    await act(() => vi.advanceTimersByTimeAsync(500));
    expect(await screen.findByText("Saved!")).toBeInTheDocument();
    expect(screen.queryByText("Saving…")).not.toBeInTheDocument();

    await act(() => vi.advanceTimersByTimeAsync(2100));
    await waitFor(() =>
      expect(screen.queryByText("Saved!")).not.toBeInTheDocument(),
    );
  });

  it("pauses the countdown while hovered and resumes afterwards", async () => {
    const user = setup();
    act(() => {
      message.info({ content: "Hover me", duration: 1000 });
    });
    const toast = await screen.findByText("Hover me");

    await act(() => vi.advanceTimersByTimeAsync(600));
    await user.hover(toast);
    await act(() => vi.advanceTimersByTimeAsync(5000));
    expect(screen.getByText("Hover me")).toBeInTheDocument();

    await user.unhover(toast);
    // ~400ms were left when the pointer arrived
    await act(() => vi.advanceTimersByTimeAsync(500));
    await waitFor(() =>
      expect(screen.queryByText("Hover me")).not.toBeInTheDocument(),
    );
  });

  it("keeps at most maxCount messages, closing the oldest first", async () => {
    message.config({ maxCount: 2, duration: 0 });
    act(() => {
      message.info("one");
      message.warning("two");
      message.error("three");
    });
    await waitFor(() => expect(messageTexts()).toEqual(["two", "three"]));
    expect(screen.getByText("three").closest('[role="alert"]')).not.toBeNull();
  });

  it("closes a message with its close button and destroys the rest", async () => {
    const user = setup();
    const onClose = vi.fn();
    act(() => {
      message.success({
        content: "Closable",
        showClose: true,
        duration: 0,
        onClose,
      });
      message.info({ content: "Other", duration: 0 });
    });
    await screen.findByText("Closable");
    const closeButton = await screen.findByRole("button", { name: /close/i });
    await user.click(closeButton);
    await waitFor(() =>
      expect(screen.queryByText("Closable")).not.toBeInTheDocument(),
    );
    expect(onClose).toHaveBeenCalledTimes(1);

    act(() => message.destroy());
    await waitFor(() => expect(messageTexts()).toEqual([]));
  });

  it("chains messages with the promise-based useMessage API", async () => {
    const user = setup();
    render(<Notifier />);
    await user.click(screen.getByRole("button", { name: "Chain" }));
    expect(await screen.findByText("First")).toBeInTheDocument();
    expect(screen.queryByText(/Second/)).not.toBeInTheDocument();

    await act(() => vi.advanceTimersByTimeAsync(1100));
    expect(
      await screen.findByText("Second (after first closed)"),
    ).toBeInTheDocument();
    expect(screen.queryByText("First")).not.toBeInTheDocument();
  });
});
