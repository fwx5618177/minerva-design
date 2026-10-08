import { describe, expect, it, vi } from "vitest";
import { defineComponent, h, ref } from "vue";
import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import styles from "@react-styles/components/Command/command.module.scss";
import {
  CommandDialog,
  matchesShortcut,
  normalizeShortcuts,
  type CommandItem,
} from ".";

const ITEMS: CommandItem[] = [
  { id: "books", title: "Books", description: "/books", group: "Content" },
  { id: "users", title: "Users", description: "/users", group: "Admin" },
  { id: "seo", title: "SEO", keywords: "meta sitemap" },
  { id: "hidden", title: "Hidden", disabled: true },
];

const setup = () => userEvent.setup({ pointerEventsCheck: 0 });

describe("Command shortcut helpers", () => {
  it("re-exports the core shortcut helpers", () => {
    expect(normalizeShortcuts(["mod+k", "", "  "])).toEqual(["mod+k"]);
    expect(
      matchesShortcut(
        {
          key: "k",
          metaKey: true,
          ctrlKey: false,
          shiftKey: false,
          altKey: false,
        },
        "mod+k",
      ),
    ).toBe(true);
  });
});

describe("CommandDialog", () => {
  it("renders the palette with localized defaults and the shortcut label", async () => {
    render(CommandDialog, {
      props: { open: true, items: ITEMS, shortcutLabel: "⌘K" },
    });
    const dialog = await screen.findByRole("dialog", {
      name: /Command palette/,
    });
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
    render(CommandDialog, { props: { open: true, items: ITEMS } });
    await waitFor(() => expect(screen.getByRole("combobox")).toHaveFocus());
  });

  it("filters by title, description, group and keywords, and shows the empty text", async () => {
    const user = setup();
    render(CommandDialog, {
      props: { open: true, items: ITEMS, emptyText: "Nothing here" },
    });
    const input = await screen.findByRole("combobox");
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
    await user.keyboard("{Enter}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("limits the results with maxResults", async () => {
    render(CommandDialog, {
      props: { open: true, items: ITEMS, maxResults: 2 },
    });
    expect(await screen.findAllByRole("option")).toHaveLength(2);
  });

  it("uses a custom filter for non-empty queries", async () => {
    const user = setup();
    const filter = vi.fn((items: CommandItem[], query: string) =>
      items
        .filter((item) => item.title.toLowerCase().includes(query))
        .reverse(),
    );
    render(CommandDialog, {
      props: { open: true, items: ITEMS, filter, maxResults: 1 },
    });
    expect(await screen.findAllByRole("option")).toHaveLength(1);
    expect(filter).not.toHaveBeenCalled();
    await user.type(screen.getByRole("combobox"), " s ");
    expect(filter).toHaveBeenLastCalledWith(
      ITEMS.filter((item) => !item.disabled),
      "s",
    );
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent("SEO");
  });

  it("navigates with arrows / Home / End, selects with Enter and closes", async () => {
    const user = setup();
    const { emitted } = render(CommandDialog, {
      props: { open: true, items: ITEMS },
    });
    const input = await screen.findByRole("combobox");
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
    expect(emitted("select")).toEqual([[ITEMS[1]]]);
    expect(emitted("openChange")).toEqual([[false]]);
    expect(emitted("update:open")).toEqual([[false]]);
  });

  it("keeps Home / End for the text cursor once a query is typed", async () => {
    const user = setup();
    render(CommandDialog, { props: { open: true, items: ITEMS } });
    const input = await screen.findByRole("combobox");
    await user.type(input, "s");
    const before = screen.getAllByRole("option")[0];
    await user.keyboard("{End}");
    expect(screen.getAllByRole("option")[0]).toBe(before);
    expect(before).toHaveAttribute("aria-selected", "true");
  });

  it("selects on click and highlights on hover (v-model:open)", async () => {
    const user = setup();
    const open = ref(true);
    const onSelect = vi.fn();
    render(
      defineComponent(
        () => () =>
          h(CommandDialog, {
            open: open.value,
            "onUpdate:open": (v: boolean) => (open.value = v),
            items: ITEMS,
            onSelect,
          }),
      ),
    );
    const users = await screen.findByRole("option", { name: /Users/ });
    expect(users).toHaveAttribute("tabindex", "-1");
    await user.hover(users);
    expect(users).toHaveAttribute("aria-selected", "true");
    expect(users).toHaveAttribute("data-highlighted", "");
    await user.click(users);
    expect(onSelect).toHaveBeenCalledWith(ITEMS[1]);
    expect(open.value).toBe(false);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("opens from a global shortcut (uncontrolled) and resets the query on every open", async () => {
    const user = setup();
    render(
      defineComponent(() => () => [
        h("button", { type: "button" }, "Elsewhere"),
        h(CommandDialog, {
          items: ITEMS,
          shortcut: ["mod+k", "/"],
          title: "Global search",
        }),
      ]),
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
    const dialog = await screen.findByRole("dialog", {
      name: /Global search/,
    });
    expect(dialog).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("combobox")).toHaveFocus());
    // a printable shortcut typed in the search reaches the input
    await user.type(screen.getByRole("combobox"), "seo/");
    expect(screen.getByRole("combobox")).toHaveValue("seo/");
    await new Promise((r) => setTimeout(r, 5));
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(elsewhere).toHaveFocus());

    await fireEvent.keyDown(document, { key: "j", metaKey: true });
    expect(screen.queryByRole("dialog")).toBeNull();

    await fireEvent.keyDown(document, { key: "/" });
    await screen.findByRole("dialog");
    expect(screen.getByRole("combobox")).toHaveValue("");
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("generates unique option ids for aria-activedescendant", async () => {
    const user = setup();
    render(CommandDialog, { props: { open: true, items: ITEMS } });
    const input = await screen.findByRole("combobox");
    const ids = screen.getAllByRole("option").map((o) => o.id);
    expect(new Set(ids).size).toBe(3);
    ids.forEach((id, index) => expect(id).toMatch(`-option-${index}`));
    expect(input).toHaveAttribute("aria-activedescendant", ids[0]);
    input.focus();
    await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", ids[1]);
  });

  it("does not listen without a shortcut and accepts custom texts", async () => {
    render(CommandDialog, {
      props: {
        defaultOpen: true,
        items: [],
        shortcut: ["", " "],
        title: "Jump",
        description: "Find a page",
        placeholder: "Type a page",
        resultsLabel: "Pages",
        enterLabel: "Return",
        className: "extra",
      },
    });
    const dialog = await screen.findByRole("dialog", { name: /Jump/ });
    expect(dialog).toHaveClass("extra");
    expect(dialog).toHaveAccessibleDescription("Find a page");
    expect(
      screen.getByRole("combobox", { name: "Type a page" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("listbox", { name: "Pages" })).toBeInTheDocument();
    expect(screen.getByText("No matching results")).toBeInTheDocument();
    expect(screen.getByText("Return").tagName).toBe("KBD");
  });

  it("accepts slots for its texts", async () => {
    render(CommandDialog, {
      props: { open: true, items: [] },
      slots: {
        title: () => "Slot title",
        description: () => "Slot description",
        "empty-text": () => "Slot empty",
        "shortcut-label": () => "Ctrl K",
        "enter-label": () => "↵",
      },
    });
    const dialog = await screen.findByRole("dialog", { name: /Slot title/ });
    expect(dialog).toHaveAccessibleDescription("Slot description");
    expect(screen.getByText("Slot empty")).toBeInTheDocument();
    expect(screen.getByText("Ctrl K").tagName).toBe("KBD");
    expect(screen.getByText("↵").tagName).toBe("KBD");
  });

  it("removes the shortcut listener on unmount", async () => {
    const { unmount } = render(CommandDialog, {
      props: { items: ITEMS, shortcut: "mod+k" },
    });
    await new Promise((r) => setTimeout(r, 0));
    unmount();
    const event = new KeyboardEvent("keydown", {
      key: "k",
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });
});
