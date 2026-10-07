import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CommandDialog, type CommandItem } from "./index";

const ITEMS: CommandItem[] = [
  { id: "books", title: "Books", description: "/books" },
  { id: "users", title: "Users", description: "/users" },
  { id: "seo", title: "SEO" },
];

function WithTrigger({
  onSelect = () => {},
  shortcut,
}: {
  onSelect?: (item: CommandItem) => void;
  shortcut?: string | string[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Search
      </button>
      <input aria-label="Notes" />
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        items={ITEMS}
        onSelect={onSelect}
        shortcut={shortcut}
      />
    </>
  );
}

const trigger = () => screen.getByRole("button", { name: "Search" });

describe("CommandDialog keyboard (APG combobox in a modal dialog)", () => {
  it("opens from the keyboard with focus in the search combobox; Tab stays inside", async () => {
    const user = userEvent.setup();
    render(<WithTrigger />);
    await user.tab();
    expect(trigger()).toHaveFocus();
    await user.keyboard("{Enter}");
    const input = await screen.findByRole("combobox");
    await waitFor(() => expect(input).toHaveFocus());
    // The options are not tabbable: the input is the only tab stop.
    await user.tab();
    expect(input).toHaveFocus();
    await user.tab({ shift: true });
    expect(input).toHaveFocus();
  });

  it("ArrowDown / ArrowUp move aria-activedescendant, Enter selects and focus returns", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<WithTrigger onSelect={onSelect} />);
    trigger().focus();
    await user.keyboard("{Enter}");
    const input = await screen.findByRole("combobox");
    await waitFor(() => expect(input).toHaveFocus());
    const options = screen.getAllByRole("option");
    expect(input).toHaveAttribute("aria-activedescendant", options[0].id);
    await user.keyboard("{ArrowDown}{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", options[2].id);
    expect(options[2]).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowUp}");
    expect(input).toHaveAttribute("aria-activedescendant", options[1].id);
    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledWith(ITEMS[1]);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(trigger()).toHaveFocus());
  });

  it("Escape closes without selecting and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<WithTrigger onSelect={onSelect} />);
    trigger().focus();
    await user.keyboard("{Enter}");
    await screen.findByRole("combobox");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(onSelect).not.toHaveBeenCalled();
    await waitFor(() => expect(trigger()).toHaveFocus());
  });

  it("a modifier-less shortcut ('/') does not hijack typing in text fields", async () => {
    const user = userEvent.setup();
    render(<WithTrigger shortcut={["mod+k", "/"]} />);
    const notes = screen.getByRole("textbox", { name: "Notes" });
    await user.click(notes);
    await user.keyboard("a/b");
    expect(notes).toHaveValue("a/b");
    expect(screen.queryByRole("dialog")).toBeNull();

    // Outside of a text field it still opens the palette...
    trigger().focus();
    await user.keyboard("/");
    const input = await screen.findByRole("combobox");
    await waitFor(() => expect(input).toHaveFocus());
    // ...whose own search accepts "/" (e.g. to match "/books").
    await user.keyboard("/books");
    expect(input).toHaveValue("/books");
    expect(screen.getAllByRole("option").map((o) => o.id)).toHaveLength(1);
  });

  it("a modified shortcut (mod+k) still works from inside a text field", async () => {
    const user = userEvent.setup();
    render(<WithTrigger shortcut="mod+k" />);
    await user.click(screen.getByRole("textbox", { name: "Notes" }));
    await user.keyboard("{Control>}k{/Control}");
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });
});
