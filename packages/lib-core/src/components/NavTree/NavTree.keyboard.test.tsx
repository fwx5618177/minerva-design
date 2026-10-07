import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NavTree, type NavTreeSection } from ".";

const tree: NavTreeSection[] = [
  {
    id: "main",
    items: [
      { id: "home", label: "Home", href: "#home" },
      {
        id: "library",
        label: "Library",
        children: [
          { id: "books", label: "Books", href: "#books" },
          { id: "authors", label: "Authors" },
        ],
      },
      { id: "settings", label: "Settings", href: "#settings" },
    ],
  },
];

// Disclosure navigation: every item is in the Tab sequence; branches are
// buttons toggled with Enter / Space (aria-expanded).
describe("NavTree keyboard (disclosure navigation)", () => {
  it("Tab visits the items; Enter and Space toggle a branch, revealing its children in order", async () => {
    const user = userEvent.setup();
    render(<NavTree sections={tree} />);
    const branch = screen.getByRole("button", { name: "Library" });
    await user.tab();
    expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();
    await user.tab();
    expect(branch).toHaveFocus();
    expect(branch).toHaveAttribute("aria-expanded", "false");
    await user.tab();
    expect(screen.getByRole("link", { name: "Settings" })).toHaveFocus();

    await user.tab({ shift: true });
    await user.keyboard("{Enter}");
    expect(branch).toHaveAttribute("aria-expanded", "true");
    expect(branch).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("link", { name: "Books" })).toHaveFocus();

    await user.tab({ shift: true });
    await user.keyboard(" ");
    expect(branch).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("link", { name: "Books" })).toBeNull();
  });

  it("Enter activates an action item without href", async () => {
    const user = userEvent.setup();
    const onItemSelect = vi.fn();
    render(
      <NavTree
        sections={tree}
        defaultExpandedIds={["library"]}
        onItemSelect={onItemSelect}
      />,
    );
    screen.getByRole("link", { name: "Books" }).focus();
    await user.keyboard("{ArrowDown}");
    const authors = screen.getByRole("button", { name: "Authors" });
    expect(authors).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onItemSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "authors" }),
    );
  });
});
