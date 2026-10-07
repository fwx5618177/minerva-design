import { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  CommandDialog,
  matchesShortcut,
  normalizeShortcuts,
  type CommandItem,
} from "./index";
import styles from "./command.module.scss";

const ITEMS: CommandItem[] = [
  { id: "books", title: "Books", description: "/books", group: "Content" },
  { id: "users", title: "Users", description: "/users", group: "Admin" },
  { id: "seo", title: "SEO", keywords: "meta sitemap" },
  { id: "hidden", title: "Hidden", disabled: true },
];

const setup = () => userEvent.setup({ pointerEventsCheck: 0 });

const key = (
  k: string,
  mods: Partial<
    Record<"metaKey" | "ctrlKey" | "shiftKey" | "altKey", boolean>
  > = {},
) => ({
  key: k,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
  ...mods,
});

describe("Command shortcut handling", () => {
  it("ignores empty runtime shortcut values", () => {
    expect(
      normalizeShortcuts(["mod+k", undefined as unknown as string, "", "  "]),
    ).toEqual(["mod+k"]);
    expect(normalizeShortcuts("ctrl+p")).toEqual(["ctrl+p"]);
    expect(normalizeShortcuts(undefined)).toEqual([]);
  });

  it("does not throw when shortcut is undefined at runtime", () => {
    expect(matchesShortcut(key("k", { metaKey: true }), undefined)).toBe(false);
  });

  it("matches mod shortcut with meta or ctrl", () => {
    expect(matchesShortcut(key("k", { metaKey: true }), "mod+k")).toBe(true);
    expect(matchesShortcut(key("k", { ctrlKey: true }), "mod+k")).toBe(true);
    expect(matchesShortcut(key("k"), "mod+k")).toBe(false);
  });

  it("checks every modifier and the key", () => {
    expect(matchesShortcut(key("K", { ctrlKey: true }), "Ctrl + K")).toBe(true);
    expect(matchesShortcut(key("k", { metaKey: true }), "ctrl+k")).toBe(false);
    expect(matchesShortcut(key("k", { ctrlKey: true }), "cmd+k")).toBe(false);
    expect(matchesShortcut(key("k", { metaKey: true }), "meta+k")).toBe(true);
    expect(matchesShortcut(key("p"), "shift+p")).toBe(false);
    expect(matchesShortcut(key("p", { shiftKey: true }), "shift+p")).toBe(true);
    expect(matchesShortcut(key("p"), "option+p")).toBe(false);
    expect(matchesShortcut(key("p", { altKey: true }), "alt+p")).toBe(true);
    expect(matchesShortcut(key("j", { metaKey: true }), "mod+k")).toBe(false);
    expect(matchesShortcut(key("k"), "  ")).toBe(false);
  });
});

describe("CommandDialog", () => {
  it("renders the palette with localized defaults and the shortcut label", () => {
    render(
      <CommandDialog
        open
        items={ITEMS}
        onSelect={() => {}}
        shortcutLabel="⌘K"
      />,
    );
    const dialog = screen.getByRole("dialog", { name: /Command palette/ });
    expect(dialog).toHaveClass(styles.dialog, "large");
    expect(dialog).toHaveAccessibleDescription(
      "Search and jump to modules, settings pages or actions.",
    );
    expect(screen.getByText("⌘K").tagName).toBe("KBD");
    expect(screen.queryByRole("button", { name: "Close" })).toBeNull();
    const input = screen.getByRole("combobox", {
      name: "Search commands, paths or keywords",
    });
    const listbox = screen.getByRole("listbox", { name: "Command results" });
    expect(input).toHaveAttribute("aria-controls", listbox.id);
    expect(input).toHaveAttribute("aria-expanded", "true");
    const options = screen.getAllByRole("option");
    // Disabled items are never listed.
    expect(options.map((o) => o.textContent)).toEqual([
      "Books/booksContent",
      "Users/usersAdmin",
      "SEO",
    ]);
    expect(options[0]).toHaveAttribute("aria-selected", "true");
    expect(options[0]).toHaveClass(styles.item);
    expect(input).toHaveAttribute("aria-activedescendant", options[0].id);
    expect(screen.getByText("Content")).toHaveClass(styles.group);
  });

  it("focuses the search input when opened", async () => {
    render(<CommandDialog open items={ITEMS} onSelect={() => {}} />);
    await waitFor(() => expect(screen.getByRole("combobox")).toHaveFocus());
  });

  it("filters by title, description, group and keywords, and shows the empty text", async () => {
    const user = setup();
    render(
      <CommandDialog
        open
        items={ITEMS}
        onSelect={() => {}}
        emptyText="Nothing here"
      />,
    );
    const input = screen.getByRole("combobox");
    await user.type(input, "sitemap");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual([
      "SEO",
    ]);
    await user.clear(input);
    await user.type(input, "  ADMIN ");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    await user.clear(input);
    await user.type(input, "hidden");
    expect(screen.queryAllByRole("option")).toHaveLength(0);
    expect(screen.getByText("Nothing here")).toHaveClass(styles.empty);
    expect(input).not.toHaveAttribute("aria-activedescendant");
    // Enter with no result does nothing.
    await user.keyboard("{Enter}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("limits the results with maxResults", () => {
    render(
      <CommandDialog open items={ITEMS} onSelect={() => {}} maxResults={2} />,
    );
    expect(screen.getAllByRole("option")).toHaveLength(2);
  });

  it("navigates with arrows / Home / End, selects with Enter and closes", async () => {
    const user = setup();
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <CommandDialog
        open
        onOpenChange={onOpenChange}
        items={ITEMS}
        onSelect={onSelect}
      />,
    );
    const input = screen.getByRole("combobox");
    input.focus();
    const selected = () =>
      screen
        .getAllByRole("option")
        .findIndex((o) => o.getAttribute("aria-selected") === "true");
    await user.keyboard("{ArrowUp}");
    expect(selected()).toBe(0);
    await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}");
    expect(selected()).toBe(2);
    await user.keyboard("{Home}");
    expect(selected()).toBe(0);
    await user.keyboard("{End}");
    expect(selected()).toBe(2);
    await user.keyboard("{ArrowUp}");
    expect(input).toHaveAttribute(
      "aria-activedescendant",
      screen.getAllByRole("option")[1].id,
    );
    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledWith(ITEMS[1]);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("keeps Home / End for the text cursor once a query is typed", async () => {
    const user = setup();
    render(<CommandDialog open items={ITEMS} onSelect={() => {}} />);
    const input = screen.getByRole("combobox");
    await user.type(input, "s");
    const before = screen.getAllByRole("option")[0];
    await user.keyboard("{End}");
    expect(screen.getAllByRole("option")[0]).toBe(before);
    expect(before).toHaveAttribute("aria-selected", "true");
  });

  it("selects on click and highlights on hover", async () => {
    const user = setup();
    const onSelect = vi.fn();
    function Harness() {
      const [open, setOpen] = useState(true);
      return (
        <CommandDialog
          open={open}
          onOpenChange={setOpen}
          items={ITEMS}
          onSelect={onSelect}
        />
      );
    }
    render(<Harness />);
    const users = screen.getByRole("option", { name: /Users/ });
    expect(users).toHaveAttribute("tabindex", "-1");
    await user.hover(users);
    expect(users).toHaveAttribute("aria-selected", "true");
    expect(users).toHaveAttribute("data-active", "true");
    await user.click(users);
    expect(onSelect).toHaveBeenCalledWith(ITEMS[1]);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("opens from a global shortcut (uncontrolled) and resets the query on every open", async () => {
    const user = setup();
    render(
      <>
        <button type="button">Elsewhere</button>
        <CommandDialog
          items={ITEMS}
          onSelect={() => {}}
          shortcut={["mod+k", "/"]}
          title="Global search"
        />
      </>,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    const elsewhere = screen.getByRole("button", { name: "Elsewhere" });
    elsewhere.focus();
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    const dialog = await screen.findByRole("dialog", { name: /Global search/ });
    expect(dialog).toBeInTheDocument();
    await user.type(screen.getByRole("combobox"), "seo");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(elsewhere).toHaveFocus());

    // Unrelated keys are ignored.
    fireEvent.keyDown(document, { key: "j", metaKey: true });
    expect(screen.queryByRole("dialog")).toBeNull();

    fireEvent.keyDown(document, { key: "/" });
    await screen.findByRole("dialog");
    expect(screen.getByRole("combobox")).toHaveValue("");
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("generates unique option ids for aria-activedescendant", async () => {
    const user = setup();
    render(<CommandDialog open items={ITEMS} onSelect={() => {}} />);
    const input = screen.getByRole("combobox");
    const ids = screen.getAllByRole("option").map((o) => o.id);
    expect(new Set(ids).size).toBe(3);
    ids.forEach((id, index) => expect(id).toMatch(`-option-${index}`));
    expect(input).toHaveAttribute("aria-activedescendant", ids[0]);
    input.focus();
    await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", ids[1]);
  });

  it("does not listen without a shortcut and accepts custom texts", () => {
    render(
      <CommandDialog
        defaultOpen
        items={[]}
        onSelect={() => {}}
        shortcut={["", " "]}
        title="Jump"
        description="Find a page"
        placeholder="Type a page"
        resultsLabel="Pages"
        enterLabel="Return"
        className="extra"
      />,
    );
    const dialog = screen.getByRole("dialog", { name: /Jump/ });
    expect(dialog).toHaveClass("extra");
    expect(dialog).toHaveAccessibleDescription("Find a page");
    expect(
      screen.getByRole("combobox", { name: "Type a page" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("listbox", { name: "Pages" })).toBeInTheDocument();
    expect(screen.getByText("No matching results")).toBeInTheDocument();
    expect(screen.getByText("Return").tagName).toBe("KBD");
  });
});
