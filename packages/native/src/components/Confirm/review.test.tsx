import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { expect, it, vi } from "vitest";
import { ConfirmDialog } from "./index";
it("clears a failed confirmation when a new open session begins", async () => {
  const onConfirm = vi.fn().mockRejectedValue(new Error("Previous failure"));
  const props = { title: "Delete", onOpenChange: vi.fn(), onConfirm };
  const view = await render(<ConfirmDialog {...props} open />);
  await fireEvent.press(screen.getByRole("button", { name: "Confirm" }));
  await waitFor(() =>
    expect(screen.getByText("Previous failure")).toBeTruthy(),
  );
  await view.rerender(<ConfirmDialog {...props} open={false} />);
  await view.rerender(<ConfirmDialog {...props} open />);
  expect(screen.queryByText("Previous failure")).toBeNull();
});

it("ignores a previous session rejection after its controlled dialog was reopened", async () => {
  let reject!: (error: Error) => void;
  const task = new Promise<void>((_, fail) => {
    reject = fail;
  });
  const props = {
    title: "Delete",
    onOpenChange: vi.fn(),
    onConfirm: () => task,
  };
  const view = await render(<ConfirmDialog {...props} open />);
  const pressing = fireEvent.press(
    screen.getByRole("button", { name: "Confirm" }),
  );
  await waitFor(() =>
    expect(
      screen.getByRole("button", { name: "Confirm" }).props.accessibilityState
        .busy,
    ).toBe(true),
  );
  await view.rerender(<ConfirmDialog {...props} open={false} />);
  await view.rerender(<ConfirmDialog {...props} open />);
  await act(async () => {
    reject(new Error("Stale failure"));
    await task.catch(() => {});
    await pressing;
  });
  expect(screen.queryByText("Stale failure")).toBeNull();
  expect(screen.getByRole("button", { name: "Confirm" })).toBeEnabled();
});
