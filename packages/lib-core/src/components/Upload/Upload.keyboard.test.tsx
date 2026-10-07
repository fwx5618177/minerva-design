// Keyboard audit: select button opens the picker, item actions are reachable
// and focus is kept in the component when an item is removed.
import { useState } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Upload from "./Upload";
import type { UploadItem, UploadProps } from "./types";

const items: UploadItem[] = [
  { id: "1", name: "a.png", status: "done" },
  { id: "2", name: "b.png", status: "error", error: "Offline" },
  { id: "3", name: "c.png", status: "done" },
];

function App(props: Partial<UploadProps>) {
  const [value, setValue] = useState(items);
  return (
    <Upload
      label="Attachments"
      multiple
      value={value}
      onFilesSelected={() => {}}
      onRetry={() => {}}
      onRemove={(item) =>
        setValue((current) => current.filter((it) => it.id !== item.id))
      }
      {...props}
    />
  );
}

const select = () => screen.getByRole("button", { name: "Select files" });
const removeButton = (name: string) =>
  screen.getByRole("button", { name: `Remove ${name}` });

describe("Upload keyboard", () => {
  it("opens the file picker with Space on the select button", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    const input =
      container.querySelector<HTMLInputElement>('input[type="file"]')!;
    const click = vi.spyOn(input, "click");
    await user.tab();
    expect(select()).toHaveFocus();
    await user.keyboard(" ");
    expect(click).toHaveBeenCalledTimes(1);
  });

  it("reaches the retry and remove buttons of every item in order", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.tab();
    await user.tab();
    expect(removeButton("a.png")).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Retry b.png" })).toHaveFocus();
    await user.tab();
    expect(removeButton("b.png")).toHaveFocus();
    await user.tab();
    expect(removeButton("c.png")).toHaveFocus();
  });

  it("moves focus to the next remove button, else the select button, after a keyboard removal", async () => {
    const user = userEvent.setup();
    render(<App />);
    removeButton("b.png").focus();
    await user.keyboard("{Enter}");
    expect(screen.queryByText("b.png")).not.toBeInTheDocument();
    expect(removeButton("c.png")).toHaveFocus();
    // last item: falls back to the previous one
    await user.keyboard(" ");
    expect(removeButton("a.png")).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    expect(select()).toHaveFocus();
  });

  it("restores focus when the parent removes the item later (async)", async () => {
    const user = userEvent.setup();
    let removeLater: (() => void) | undefined;
    function Async() {
      const [value, setValue] = useState(items.slice(0, 1));
      return (
        <Upload
          label="Attachments"
          value={value}
          onFilesSelected={() => {}}
          onRemove={() => {
            removeLater = () => setValue([]);
          }}
        />
      );
    }
    render(<Async />);
    removeButton("a.png").focus();
    await user.keyboard("{Enter}");
    // still focused while the transfer is cancelled
    expect(removeButton("a.png")).toHaveFocus();
    act(() => removeLater!());
    expect(select()).toHaveFocus();
  });

  it("does not move focus that the user already moved elsewhere", async () => {
    const user = userEvent.setup();
    let removeLater: (() => void) | undefined;
    function Async() {
      const [value, setValue] = useState(items.slice(0, 1));
      return (
        <>
          <Upload
            label="Attachments"
            value={value}
            onFilesSelected={() => {}}
            onRemove={() => {
              removeLater = () => setValue([]);
            }}
          />
          <input aria-label="elsewhere" />
        </>
      );
    }
    render(<Async />);
    removeButton("a.png").focus();
    await user.keyboard("{Enter}");
    await user.click(screen.getByRole("textbox", { name: "elsewhere" }));
    act(() => removeLater!());
    expect(screen.getByRole("textbox", { name: "elsewhere" })).toHaveFocus();
  });

  it("skips every control when disabled", async () => {
    const user = userEvent.setup();
    render(<App disabled />);
    await user.tab();
    expect(document.body).toHaveFocus();
  });
});
