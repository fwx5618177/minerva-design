// Keyboard audit: add / remove reachable by keyboard, focus follows the action.
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { KeyValueEditor, type KeyValueEntry } from ".";

const initial: KeyValueEntry[] = [
  { id: "a", key: "alpha", value: "1" },
  { id: "b", key: "beta", value: "2" },
  { id: "c", key: "gamma", value: "3" },
];

function App({
  entries: start = initial,
  accept = true,
}: {
  entries?: KeyValueEntry[];
  accept?: boolean;
}) {
  const [entries, setEntries] = useState(start);
  return (
    <KeyValueEditor
      entries={entries}
      onChange={(next) => {
        if (accept) setEntries(next);
      }}
    />
  );
}

const remove = (n: number) =>
  screen.getByRole("button", { name: `Remove entry ${n}` });
const add = () => screen.getByRole("button", { name: "Add entry" });

describe("KeyValueEditor keyboard", () => {
  it("tabs through key, value and remove of each row, then the add button", async () => {
    const user = userEvent.setup();
    render(<App entries={initial.slice(0, 1)} />);
    await user.tab();
    expect(screen.getByRole("textbox", { name: "Key 1" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("textbox", { name: "Value 1" })).toHaveFocus();
    await user.tab();
    expect(remove(1)).toHaveFocus();
    await user.tab();
    expect(add()).toHaveFocus();
  });

  it("adds a row with Enter / Space and focuses its key field", async () => {
    const user = userEvent.setup();
    render(<App entries={[]} />);
    await user.tab();
    expect(add()).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("textbox", { name: "Key 1" })).toHaveFocus();
    await user.keyboard("token");
    expect(screen.getByRole("textbox", { name: "Key 1" })).toHaveValue("token");

    add().focus();
    await user.keyboard(" ");
    expect(screen.getByRole("textbox", { name: "Key 2" })).toHaveFocus();
  });

  it("moves focus to the next row's remove button, else the previous one, else the add button", async () => {
    const user = userEvent.setup();
    render(<App />);
    remove(2).focus();
    await user.keyboard("{Enter}");
    expect(screen.queryByDisplayValue("beta")).not.toBeInTheDocument();
    // "gamma" is now row 2
    expect(remove(2)).toHaveFocus();
    expect(screen.getByRole("textbox", { name: "Key 2" })).toHaveValue("gamma");

    await user.keyboard(" ");
    expect(remove(1)).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.queryAllByRole("textbox")).toHaveLength(0);
    expect(add()).toHaveFocus();
  });

  it("keeps focus where it is when a controlled parent rejects the change", async () => {
    const user = userEvent.setup();
    render(<App accept={false} />);
    remove(1).focus();
    await user.keyboard("{Enter}");
    expect(remove(1)).toHaveFocus();
    add().focus();
    await user.keyboard("{Enter}");
    expect(add()).toHaveFocus();
  });

  it("does not steal focus later when rows change by typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<KeyValueEditor defaultEntries={initial} onChange={onChange} />);
    const value = screen.getByRole("textbox", { name: "Value 3" });
    await user.click(value);
    await user.keyboard("x");
    expect(value).toHaveFocus();
    expect(onChange).toHaveBeenCalled();
  });

  it("skips every control when disabled", async () => {
    const user = userEvent.setup();
    render(<KeyValueEditor defaultEntries={initial} disabled />);
    await user.tab();
    expect(document.body).toHaveFocus();
  });
});
