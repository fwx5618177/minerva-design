// Ported from @novel-isr/ui tests/e2e/data-table.test.tsx.
//
// A "book list" page — Input filter + DataTable + Pagination (with page-size
// Select). The page owns slicing/filtering/sorting; DataTable renders the
// already-paginated rows.
// Native suite: Minerva's API with lib-core's default English built-in texts
// ("Pagination", "Previous page", "Page 1", "Items per page", "5 / page",
// "Retry"); consumer strings (titles, headers, total, empty text) stay as in
// the original. The compat block runs the original scenario verbatim through
// @minerva/lib-core/compat (novel props + Chinese defaults).
import { useMemo, useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Button,
  DataTable,
  FormField,
  Input,
  type TableColumn,
} from "@minerva/lib-core";
import * as compat from "@minerva/lib-core/compat";

interface Book {
  id: number;
  title: string;
  score: number;
}

const BOOKS: Book[] = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  title: `${i % 2 === 0 ? "星辰" : "江湖"}卷 ${String(i + 1).padStart(2, "0")}`,
  score: (i * 7) % 10,
}));

type SortDir = "none" | "ascending" | "descending";

const nextSort: Record<SortDir, SortDir> = {
  none: "ascending",
  ascending: "descending",
  descending: "none",
};

function useBookList(initialError: boolean) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sort, setSort] = useState<SortDir>("none");
  const [error, setError] = useState(initialError);

  const filtered = useMemo(() => {
    const rows = BOOKS.filter((book) => book.title.includes(query.trim()));
    if (sort === "none") return rows;
    const dir = sort === "ascending" ? 1 : -1;
    return [...rows].sort((a, b) => (a.score - b.score || a.id - b.id) * dir);
  }, [query, sort]);
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const scoreLabel = `评分${sort === "ascending" ? " ↑" : sort === "descending" ? " ↓" : ""}`;
  const cycleSort = () => {
    setSort(nextSort[sort]);
    setPage(1);
  };

  return {
    query,
    setQuery,
    page,
    setPage,
    pageSize,
    setPageSize,
    error,
    setError,
    filtered,
    rows,
    scoreLabel,
    cycleSort,
  };
}

function BookListPage({ initialError = false }: { initialError?: boolean }) {
  const s = useBookList(initialError);
  const columns: TableColumn<Book>[] = [
    { key: "title", header: "书名" },
    {
      key: "score",
      header: (
        <Button appearance="ghost" size="small" onClick={s.cycleSort}>
          {s.scoreLabel}
        </Button>
      ),
      align: "right",
    },
  ];

  return (
    <main>
      <FormField label="搜索书名">
        <Input
          type="search"
          value={s.query}
          onChange={(e) => {
            s.setQuery(e.target.value);
            s.setPage(1);
          }}
        />
      </FormField>
      <DataTable
        aria-label="书籍"
        columns={columns}
        data={s.rows}
        rowKey={(row) => row.id}
        emptyText={`没有匹配「${s.query}」的书`}
        error={s.error ? "加载失败" : undefined}
        onRetry={() => s.setError(false)}
        pagination={{
          total: s.filtered.length,
          current: s.page,
          pageSize: s.pageSize,
          // Minerva reports page and size together; a size change resets to 1
          onChange: (nextPage, size) => {
            s.setPageSize(size);
            s.setPage(size !== s.pageSize ? 1 : nextPage);
          },
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20],
          showTotal: (total, [from, to]) =>
            `第 ${from}-${to} 条，共 ${total} 条`,
        }}
      />
    </main>
  );
}

const bodyTitles = () =>
  within(screen.getByRole("table", { name: "书籍" }))
    .getAllByRole("row")
    .slice(1)
    .map((row) => within(row).getAllByRole("cell")[0]?.textContent);

describe("book list data table", () => {
  const pager = () => screen.getByRole("navigation", { name: "Pagination" });
  const pageButton = (n: number) =>
    within(pager()).getByRole("button", { name: `Page ${n}` });

  it("paginates with next / previous / page-number buttons", async () => {
    const user = userEvent.setup();
    render(<BookListPage />);

    expect(bodyTitles()).toEqual([
      "星辰卷 01",
      "江湖卷 02",
      "星辰卷 03",
      "江湖卷 04",
      "星辰卷 05",
    ]);
    expect(
      within(pager()).getByText("第 1-5 条，共 23 条"),
    ).toBeInTheDocument();
    expect(
      within(pager()).getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
    expect(pageButton(1)).toHaveAttribute("aria-current", "page");

    await user.click(
      within(pager()).getByRole("button", { name: "Next page" }),
    );
    expect(bodyTitles()[0]).toBe("江湖卷 06");
    expect(pageButton(2)).toHaveAttribute("aria-current", "page");

    await user.click(pageButton(5));
    expect(bodyTitles()).toEqual(["星辰卷 21", "江湖卷 22", "星辰卷 23"]);
    expect(
      within(pager()).getByText("第 21-23 条，共 23 条"),
    ).toBeInTheDocument();
    expect(
      within(pager()).getByRole("button", { name: "Next page" }),
    ).toBeDisabled();

    await user.click(
      within(pager()).getByRole("button", { name: "Previous page" }),
    );
    expect(bodyTitles()[0]).toBe("江湖卷 16");
    expect(pageButton(1)).not.toHaveAttribute("aria-current");
  });

  it("changes page size from the pager select and returns to page 1", async () => {
    const user = userEvent.setup();
    render(<BookListPage />);

    await user.click(pageButton(3));
    const sizeSelect = within(pager()).getByRole("combobox", {
      name: "Items per page",
    });
    // Minerva's size changer is a native <select> (novel: the lib's custom
    // Select listbox opened with Enter), so the option is picked with
    // selectOptions and the shown value read with toHaveDisplayValue.
    expect(sizeSelect).toHaveDisplayValue("5 / page");

    sizeSelect.focus();
    await user.selectOptions(
      sizeSelect,
      screen.getByRole("option", { name: "10 / page" }),
    );

    expect(sizeSelect).toHaveDisplayValue("10 / page");
    expect(bodyTitles()).toHaveLength(10);
    expect(
      within(pager()).getByText("第 1-10 条，共 23 条"),
    ).toBeInTheDocument();
    expect(
      within(pager())
        .getAllByRole("button", { name: /^Page \d+$/ })
        .map((b) => b.textContent),
    ).toEqual(["1", "2", "3"]);
  });

  it("sorts by clicking the score header, cycling ascending → descending → original", async () => {
    const user = userEvent.setup();
    render(<BookListPage />);
    const scoreHeader = () => screen.getByRole("button", { name: /^评分/ });
    const scores = () =>
      within(screen.getByRole("table", { name: "书籍" }))
        .getAllByRole("row")
        .slice(1)
        .map((row) => Number(within(row).getAllByRole("cell")[1]?.textContent));

    await user.click(pageButton(2));
    await user.click(scoreHeader());
    expect(scoreHeader()).toHaveTextContent("评分 ↑");
    expect(pageButton(1)).toHaveAttribute("aria-current", "page");
    expect(scores()).toEqual([0, 0, 0, 1, 1]);

    await user.click(scoreHeader());
    expect(scores()).toEqual([9, 9, 8, 8, 7]);

    await user.click(scoreHeader());
    expect(scoreHeader()).toHaveTextContent(/^评分$/);
    expect(bodyTitles()[0]).toBe("星辰卷 01");
  });

  it("filter narrows rows, resets to page 1, and shows the empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<BookListPage />);
    const search = screen.getByRole("searchbox", { name: "搜索书名" });

    await user.click(pageButton(3));
    await user.type(search, "江湖");

    expect(bodyTitles()).toEqual([
      "江湖卷 02",
      "江湖卷 04",
      "江湖卷 06",
      "江湖卷 08",
      "江湖卷 10",
    ]);
    expect(
      within(pager()).getByText("第 1-5 条，共 11 条"),
    ).toBeInTheDocument();
    expect(pageButton(1)).toHaveAttribute("aria-current", "page");

    await user.clear(search);
    await user.type(search, "不存在");
    const table = screen.getByRole("table", { name: "书籍" });
    expect(
      within(table).getByRole("cell", { name: "没有匹配「不存在」的书" }),
    ).toBeInTheDocument();
    expect(within(pager()).getByText("第 0-0 条，共 0 条")).toBeInTheDocument();
    expect(
      within(pager()).getByRole("button", { name: "Next page" }),
    ).toBeDisabled();

    await user.clear(search);
    expect(bodyTitles()).toHaveLength(5);
  });

  it("shows an error state with a retry action that recovers the table", async () => {
    const user = userEvent.setup();
    render(<BookListPage initialError />);

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("加载失败");
    await user.click(screen.getByRole("button", { name: "Retry" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(bodyTitles()).toHaveLength(5);
  });
});

// ─── The original novel page, verbatim through the compat entry ──────────

function CompatBookListPage({
  initialError = false,
}: {
  initialError?: boolean;
}) {
  const s = useBookList(initialError);
  const columns: compat.TableColumn<Book>[] = [
    { key: "title", header: "书名" },
    {
      key: "score",
      header: (
        <compat.Button variant="ghost" size="sm" onClick={s.cycleSort}>
          {s.scoreLabel}
        </compat.Button>
      ),
      align: "right",
    },
  ];

  return (
    <main>
      <compat.FormField label="搜索书名">
        <compat.Input
          type="search"
          value={s.query}
          onChange={(e) => {
            s.setQuery(e.target.value);
            s.setPage(1);
          }}
        />
      </compat.FormField>
      <compat.DataTable
        aria-label="书籍"
        columns={columns}
        data={s.rows}
        rowKey={(row) => row.id}
        emptyText={`没有匹配「${s.query}」的书`}
        error={s.error ? "加载失败" : undefined}
        onRetry={() => s.setError(false)}
        pagination={{
          total: s.filtered.length,
          page: s.page,
          pageSize: s.pageSize,
          onPageChange: s.setPage,
          pageSizeOptions: [5, 10, 20],
          onPageSizeChange: (size) => {
            s.setPageSize(size);
            s.setPage(1);
          },
          showTotal: (total, [from, to]) =>
            `第 ${from}-${to} 条，共 ${total} 条`,
        }}
      />
    </main>
  );
}

describe("via @minerva/lib-core/compat", () => {
  const pager = () => screen.getByRole("navigation", { name: "分页" });

  it("paginates with next / previous / page-number buttons", async () => {
    const user = userEvent.setup();
    render(<CompatBookListPage />);

    expect(bodyTitles()).toEqual([
      "星辰卷 01",
      "江湖卷 02",
      "星辰卷 03",
      "江湖卷 04",
      "星辰卷 05",
    ]);
    expect(
      within(pager()).getByText("第 1-5 条，共 23 条"),
    ).toBeInTheDocument();
    expect(
      within(pager()).getByRole("button", { name: "上一页" }),
    ).toBeDisabled();
    expect(within(pager()).getByRole("button", { name: "1" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    await user.click(within(pager()).getByRole("button", { name: "下一页" }));
    expect(bodyTitles()[0]).toBe("江湖卷 06");
    expect(within(pager()).getByRole("button", { name: "2" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    await user.click(within(pager()).getByRole("button", { name: "5" }));
    expect(bodyTitles()).toEqual(["星辰卷 21", "江湖卷 22", "星辰卷 23"]);
    expect(
      within(pager()).getByText("第 21-23 条，共 23 条"),
    ).toBeInTheDocument();
    expect(
      within(pager()).getByRole("button", { name: "下一页" }),
    ).toBeDisabled();

    await user.click(within(pager()).getByRole("button", { name: "上一页" }));
    expect(bodyTitles()[0]).toBe("江湖卷 16");
    expect(
      within(pager()).getByRole("button", { name: "1" }),
    ).not.toHaveAttribute("aria-current");
  });

  it("changes page size from the pager select and returns to page 1", async () => {
    const user = userEvent.setup();
    render(<CompatBookListPage />);

    await user.click(within(pager()).getByRole("button", { name: "3" }));
    const sizeSelect = within(pager()).getByRole("combobox", {
      name: "每页显示条数",
    });
    expect(sizeSelect).toHaveTextContent("5 条 / 页");

    sizeSelect.focus();
    await user.keyboard("{Enter}");
    await user.click(await screen.findByRole("option", { name: "10 条 / 页" }));

    expect(sizeSelect).toHaveTextContent("10 条 / 页");
    expect(bodyTitles()).toHaveLength(10);
    expect(
      within(pager()).getByText("第 1-10 条，共 23 条"),
    ).toBeInTheDocument();
    expect(
      within(pager())
        .getAllByRole("button", { name: /^\d+$/ })
        .map((b) => b.textContent),
    ).toEqual(["1", "2", "3"]);
  });

  it("shows an error state with a retry action that recovers the table", async () => {
    const user = userEvent.setup();
    render(<CompatBookListPage initialError />);

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("加载失败");
    await user.click(screen.getByRole("button", { name: "重试" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(bodyTitles()).toHaveLength(5);
  });
});
