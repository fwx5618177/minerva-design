// A small catalogue: filter with a Menu and a search field, see the
// active filters as removable Tags, page through results with
// Pagination, render the page in a VirtualList, and fall back to Empty.
import { useMemo, useState } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  Button,
  Empty,
  Pagination,
  Tag,
  Input,
  Menu,
  VirtualList,
  type MenuAction,
} from "@minerva/lib-core";

const CATEGORIES = ["Books", "Games", "Music"] as const;
const products = Array.from({ length: 95 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: CATEGORIES[i % CATEGORIES.length],
}));
const PAGE_SIZE = 10;

const categoryItems: MenuAction[] = CATEGORIES.map((c) => ({
  key: c,
  label: c,
}));

const Catalogue = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const results = useMemo(
    () =>
      products.filter(
        (p) =>
          (!category || p.category === category) &&
          p.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [category, search],
  );
  const pageItems = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const clearFilters = () => {
    setCategory(null);
    setSearch("");
    setQuery("");
    setPage(1);
  };

  return (
    <main>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(query);
          setPage(1);
        }}
      >
        <Input
          name="q"
          aria-label="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
      <Menu
        ariaLabel="Categories"
        align="start"
        items={categoryItems}
        onSelect={(item) => {
          setCategory(item.key);
          setPage(1);
        }}
      >
        <button type="button">Filter by category</button>
      </Menu>

      <section aria-label="Active filters">
        {category && (
          <Tag
            closable
            closeLabel={`Remove filter ${category}`}
            onClose={() => setCategory(null)}
          >
            {category}
          </Tag>
        )}
        {search && (
          <Tag
            closable
            closeLabel="Clear search"
            onClose={() => {
              setSearch("");
              setQuery("");
            }}
          >
            {`“${search}”`}
          </Tag>
        )}
      </section>

      <p aria-live="polite" data-count>
        {results.length} results
      </p>

      {results.length === 0 ? (
        <Empty description="No products match your filters">
          <Button onClick={clearFilters}>Clear filters</Button>
        </Empty>
      ) : (
        <>
          <VirtualList
            ariaLabel="Products"
            items={pageItems.map((p) => ({
              id: p.id,
              metadata: { name: p.name, category: p.category },
            }))}
            itemHeight={32}
            maxHeight={400}
            renderItem={(item) => (
              <span>
                {String(item.metadata?.name)} ·{" "}
                {String(item.metadata?.category)}
              </span>
            )}
          />
          <Pagination
            total={results.length}
            pageSize={PAGE_SIZE}
            current={page}
            onChange={(next) => setPage(next)}
            showTotal
          />
        </>
      )}
    </main>
  );
};

const resultCount = () => screen.getByText(/^\d+ results$/);

const visibleProducts = () =>
  within(screen.getByRole("list", { name: "Products" }))
    .getAllByRole("listitem")
    .map((li) => li.textContent);

describe("e2e: data browsing", () => {
  beforeEach(() => {
    // happy-dom has no layout: give the list viewport a height
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(400);
  });

  it("pages through results with the mouse and the keyboard", async () => {
    const user = userEvent.setup();
    render(<Catalogue />);

    expect(resultCount()).toHaveTextContent("95 results");
    expect(visibleProducts()).toHaveLength(10);
    expect(visibleProducts()[0]).toContain("Product 1 ");

    const nav = screen.getByRole("navigation");
    await user.click(within(nav).getByRole("button", { name: /^Page 3$/ }));
    expect(visibleProducts()[0]).toContain("Product 21 ");
    expect(
      within(nav).getByRole("button", { name: /^Page 3$/ }),
    ).toHaveAttribute("aria-current", "page");

    await user.click(within(nav).getByRole("button", { name: "Next page" }));
    expect(visibleProducts()[0]).toContain("Product 31 ");
  });

  it("filters with the dropdown, shows a removable tag and resets the page", async () => {
    const user = userEvent.setup();
    render(<Catalogue />);
    const nav = screen.getByRole("navigation");
    await user.click(within(nav).getByRole("button", { name: /^Page 2$/ }));

    // keyboard: open the menu, move to "Games", select
    const trigger = screen.getByRole("button", { name: "Filter by category" });
    trigger.focus();
    await user.keyboard("{ArrowDown}");
    await waitFor(() =>
      expect(screen.getByRole("menuitem", { name: "Books" })).toHaveFocus(),
    );
    await user.keyboard("{ArrowDown}{Enter}");
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(trigger).toHaveFocus());

    expect(resultCount()).toHaveTextContent("32 results");
    expect(visibleProducts().every((t) => t?.includes("Games"))).toBe(true);
    expect(visibleProducts()[0]).toContain("Product 2 ");

    const filters = screen.getByRole("region", { name: "Active filters" });
    await user.click(
      within(filters).getByRole("button", { name: "Remove filter Games" }),
    );
    expect(resultCount()).toHaveTextContent("95 results");
  });

  it("searches, removes the search tag, and shows Empty with a recovery action", async () => {
    const user = userEvent.setup();
    render(<Catalogue />);

    const search = screen.getByRole("textbox", { name: "Search products" });
    await user.type(search, "Product 9{Enter}");
    // 9, 90-95
    expect(resultCount()).toHaveTextContent("7 results");
    await user.click(screen.getByRole("button", { name: "Clear search" }));
    expect(resultCount()).toHaveTextContent("95 results");

    await user.type(search, "does not exist{Enter}");
    expect(resultCount()).toHaveTextContent("0 results");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(
      screen.getByText("No products match your filters"),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(resultCount()).toHaveTextContent("95 results");
    expect(search).toHaveValue("");
    expect(visibleProducts()).toHaveLength(10);
  });
});
