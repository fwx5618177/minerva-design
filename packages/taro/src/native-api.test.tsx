import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { expect, it, vi } from "vitest";
import Taro from "@tarojs/taro";
import * as M from "./index";
it("TimePicker uses React Date values and stepped native panel choices", () => {
  const change = vi.fn();
  render(
    <M.TimePicker
      value={new Date(2026, 0, 1, 9, 30)}
      minuteStep={15}
      showSecond={false}
      onChange={change}
    />,
  );
  const input = screen.getByRole("textbox", { name: "Time" });
  expect(input).toHaveValue("09:30");
  fireEvent.click(input);
  expect(
    within(screen.getByRole("listbox", { name: "Minutes" })).getAllByRole(
      "option",
    ),
  ).toHaveLength(4);
  fireEvent.click(
    within(screen.getByRole("listbox", { name: "Minutes" })).getByRole(
      "option",
      { name: "45" },
    ),
  );
  expect(change).toHaveBeenCalledWith(expect.any(Date));
  expect(change.mock.calls[0][0].getHours()).toBe(9);
  expect(change.mock.calls[0][0].getMinutes()).toBe(45);
  expect(input).toHaveValue("09:30");
});
it("ConfirmDialog loading blocks cancellation, normal cancel requests owner close", () => {
  const change = vi.fn();
  const { rerender } = render(
    <M.ConfirmDialog open loading title="Save?" onOpenChange={change} />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
  expect(change).not.toHaveBeenCalled();
  rerender(<M.ConfirmDialog open title="Save?" onOpenChange={change} />);
  fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
  expect(change).toHaveBeenCalledWith(false);
});
it("Toast React callable API replaces ids, offers actions and dismisses without leaking timers", async () => {
  const closed = vi.fn(),
    action = vi.fn();
  function App() {
    const toast = M.useToast();
    return (
      <>
        <M.Button
          onClick={() =>
            toast.success("Saved", {
              id: "save",
              duration: 0,
              onClose: closed,
              action: { label: "Undo", onClick: action },
            })
          }
        >
          Save
        </M.Button>
        <M.Button onClick={() => toast.update("save", { title: "Updated" })}>
          Update
        </M.Button>
      </>
    );
  }
  render(
    <M.ToastProvider>
      <App />
    </M.ToastProvider>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(screen.getByRole("status")).toHaveTextContent("Saved");
  fireEvent.click(screen.getByRole("button", { name: "Update" }));
  expect(screen.getAllByRole("status")).toHaveLength(1);
  expect(screen.getByRole("status")).toHaveTextContent("Updated");
  fireEvent.click(screen.getByRole("button", { name: "Undo" }));
  expect(action).toHaveBeenCalledTimes(1);
  expect(closed).toHaveBeenCalledWith("save");
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
});
it("Upload enforces accept and size after native picker returns files", async () => {
  (vi
    .mocked(Taro.getEnv)
    .mockReturnValue("WEAPP" as ReturnType<typeof Taro.getEnv>),
  vi.spyOn(Taro, "chooseMessageFile")).mockResolvedValue({
    errMsg: "ok",
    tempFiles: [
      { name: "good.png", path: "/good", size: 10, type: "image", time: 0 },
      { name: "bad.exe", path: "/bad", size: 10, type: "file", time: 0 },
      { name: "big.png", path: "/big", size: 200, type: "image", time: 0 },
    ],
  });
  const change = vi.fn(),
    reject = vi.fn();
  render(
    <M.Upload
      accept=".png"
      multiple
      maxSize={100}
      onChange={change}
      onReject={reject}
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Select files" }));
  await waitFor(() => expect(reject).toHaveBeenCalledTimes(1));
  expect(change).not.toHaveBeenCalled();
  expect(screen.getByRole("alert")).toHaveTextContent("bad.exe");
});
it("CodeBlock copies source through the native clipboard capability", async () => {
  const copy = vi
    .spyOn(Taro, "setClipboardData")
    .mockResolvedValue({ errMsg: "ok", data: "const a = 1" });
  render(<M.CodeBlock code="const a = 1" />);
  fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
  await waitFor(() =>
    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument(),
  );
  expect(copy).toHaveBeenCalledWith({ data: "const a = 1" });
});
it("Toast expiry removes only the elapsed notification", () => {
  vi.useFakeTimers();
  function App() {
    const toast = M.useToast();
    return (
      <M.Button
        onClick={() => {
          toast.info("Short", { duration: 100 });
          toast.info("Persistent", { duration: 0 });
        }}
      >
        Notify
      </M.Button>
    );
  }
  const view = render(
    <M.ToastProvider>
      <App />
    </M.ToastProvider>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Notify" }));
  act(() => vi.advanceTimersByTime(100));
  expect(screen.queryByText("Short")).not.toBeInTheDocument();
  expect(screen.getByText("Persistent")).toBeInTheDocument();
  view.unmount();
  vi.useRealTimers();
});
it("global confirm uses a native modal when no provider is mounted", async () => {
  const native = vi
    .spyOn(Taro, "showModal")
    .mockResolvedValue({ errMsg: "ok", confirm: false, cancel: true });
  await expect(
    M.confirm({
      title: "Delete project?",
      description: "Cannot undo",
      confirmLabel: "Delete",
    }),
  ).resolves.toBe(false);
  expect(native).toHaveBeenCalledWith(
    expect.objectContaining({
      title: "Delete project?",
      content: "Cannot undo",
      confirmText: "Delete",
    }),
  );
});
it("Upload exposes validated native files without claiming transfer completion", async () => {
  const file = {
    name: "report.pdf",
    path: "/report",
    size: 20,
    type: "file" as const,
    time: 0,
  };
  (vi
    .mocked(Taro.getEnv)
    .mockReturnValue("WEAPP" as ReturnType<typeof Taro.getEnv>),
  vi.spyOn(Taro, "chooseMessageFile")).mockResolvedValue({
    errMsg: "ok",
    tempFiles: [file],
  });
  const selected = vi.fn();
  render(<M.Upload accept=".pdf" onFilesSelected={selected} />);
  fireEvent.click(screen.getByRole("button", { name: "Select files" }));
  await waitFor(() => expect(selected).toHaveBeenCalledWith([file]));
});
