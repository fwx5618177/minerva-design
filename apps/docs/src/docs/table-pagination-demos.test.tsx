// @vitest-environment happy-dom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { SiteProviders, setupI18n } from "../test/utils";
import TablePagination from "./pages/table/demos/pagination";
import DataTableDemo from "./pages/table/demos/data-table";

beforeAll(setupI18n);

for (const [name, Demo, tableName, first, second, last, total] of [
  [
    "Table + Pagination",
    TablePagination,
    "Paginated orders",
    "ORD-001",
    "ORD-006",
    "ORD-041",
    "orders",
  ],
  ["DataTable", DataTableDemo, "Users", "User 1", "User 6", "User 41", "users"],
] as const) {
  describe(name, () => {
    it("slices rows when paging, jumping and changing size through the library Select", async () => {
      const user = userEvent.setup();
      render(
        <SiteProviders>
          <Demo />
        </SiteProviders>,
      );
      const table = () => screen.getByRole("table", { name: tableName });
      expect(within(table()).getByText(first)).toBeInTheDocument();
      expect(within(table()).getAllByRole("row")).toHaveLength(6);
      await user.click(screen.getByRole("button", { name: "Next page" }));
      expect(within(table()).queryByText(first)).toBeNull();
      expect(within(table()).getByText(second)).toBeInTheDocument();
      const jump = screen.getByRole("textbox", { name: "Jump to page" });
      await user.type(jump, "9{Enter}");
      expect(within(table()).getByText(last)).toBeInTheDocument();
      expect(screen.getByText(`41–42 of 42 ${total}`)).toBeInTheDocument();
      const changer = screen.getByRole("combobox", { name: "Items per page" });
      expect(changer.tagName).not.toBe("SELECT");
      await user.click(changer);
      await user.click(screen.getByRole("option", { name: "20 / page" }));
      expect(within(table()).getAllByRole("row")).toHaveLength(21);
      expect(within(table()).getByText(first)).toBeInTheDocument();
      expect(screen.getByText(`1–20 of 42 ${total}`)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });
  });
}

it("Vue DataTable updates its row slice and range through the library Select", async () => {
  const { default: VueDemo } = await import("./components/VueDemo");
  const { vueDemosOf } = await import("./vueDemos");
  const user = userEvent.setup();
  render(
    <SiteProviders>
      <VueDemo demo={vueDemosOf("table").pagination!} />
    </SiteProviders>,
  );
  const table = await screen.findByRole(
    "table",
    { name: "Paginated members" },
    { timeout: 10000 },
  );
  expect(within(table).getByText("Member 1")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Next page" }));
  expect(within(table).getByText("Member 6")).toBeInTheDocument();
  const changer = screen.getByRole("combobox", { name: "Items per page" });
  expect(changer.tagName).not.toBe("SELECT");
  await user.click(changer);
  await user.click(await screen.findByRole("option", { name: "20 / page" }));
  expect(within(table).getByText("Member 1")).toBeInTheDocument();
  expect(within(table).getAllByRole("row")).toHaveLength(21);
  expect(screen.getByText("1–20 of 24 members")).toBeInTheDocument();
});

it("Web Components page requests load the requested rows and page size", async () => {
  const { setup } = await import("./pages/table/wc/pagination");
  vi.useFakeTimers();
  const root = document.createElement("div");
  root.innerHTML = '<minerva-data-table id="orders"></minerva-data-table>';
  const table = root.firstElementChild as HTMLElement & {
    rows: { id: number }[];
    loading: boolean;
    pagination: { showQuickJumper: boolean; showSizeChanger: boolean };
  };
  const cleanup = setup(root);
  try {
    expect(table.pagination.showQuickJumper).toBe(true);
    expect(table.pagination.showSizeChanger).toBe(true);
    expect(table.loading).toBe(true);
    await vi.advanceTimersByTimeAsync(400);
    expect(table.rows.map((row) => row.id)).toEqual([1, 2, 3, 4, 5]);
    table.dispatchEvent(
      new CustomEvent("minerva-page-change", {
        detail: { page: 9, pageSize: 5 },
      }),
    );
    await vi.advanceTimersByTimeAsync(400);
    expect(table.rows.map((row) => row.id)).toEqual([41, 42]);
    table.dispatchEvent(
      new CustomEvent("minerva-page-change", {
        detail: { page: 1, pageSize: 20 },
      }),
    );
    await vi.advanceTimersByTimeAsync(400);
    expect(table.rows).toHaveLength(20);
    expect(table.rows[0]?.id).toBe(1);
    expect(table.rows[19]?.id).toBe(20);
    expect(table.loading).toBe(false);
  } finally {
    cleanup();
    vi.useRealTimers();
  }
});
