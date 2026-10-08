// E2E: a plain-HTML "users" screen: <minerva-data-table> with sorting, row
// selection and pagination wired by a few lines of app code (the app slices
// the page, like with the React DataTable), plus a bulk-action button that
// follows the selection.
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import "../../src/index";
import type { MinervaDataTable } from "../../src/index";
import { settle } from "../utils";

interface User {
  id: number;
  name: string;
  age: number;
}

const users: User[] = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `User ${String.fromCharCode(90 - i)}`, // Z, Y, X...
  age: 20 + ((i * 7) % 30),
}));

/** Mini app: returns helpers to read / drive the UI */
async function startApp() {
  document.body.innerHTML = `
    <minerva-button id="delete" disabled color="danger">Delete selected</minerva-button>
    <minerva-data-table id="users" selectable row-key="id" aria-label="Users"></minerva-data-table>`;
  await settle();
  const table = document.getElementById("users") as MinervaDataTable<User>;
  const del = document.getElementById("delete") as HTMLElement & {
    disabled: boolean;
  };
  let sorted = [...users];
  let page = 1;
  const pageSize = 10;
  const render = () => {
    table.rows = sorted.slice((page - 1) * pageSize, page * pageSize);
    table.pagination = { current: page, pageSize, total: users.length };
  };
  table.columns = [
    { key: "name", header: "Name", sortable: true },
    { key: "age", header: "Age", sortable: (a, b) => a.age - b.age },
  ];
  // server-like sorting: the app sorts the whole data set, then pages it
  table.manualSort = true;
  table.addEventListener("minerva-sort-change", (event) => {
    const { key, order } = (event as CustomEvent).detail;
    sorted = [...users];
    if (order) {
      sorted.sort((a, b) =>
        key === "age" ? a.age - b.age : a.name.localeCompare(b.name),
      );
      if (order === "descend") sorted.reverse();
    }
    page = 1;
    render();
  });
  table.addEventListener("minerva-page-change", (event) => {
    page = (event as CustomEvent).detail.page;
    render();
  });
  table.addEventListener("minerva-selection-change", (event) => {
    del.disabled = (event as CustomEvent).detail.selectedRowKeys.length === 0;
  });
  render();
  await settle();

  const root = table.shadowRoot!;
  return {
    table,
    del,
    names: () =>
      Array.from(root.querySelectorAll("tbody tr")).map((tr) =>
        (tr as HTMLTableRowElement).cells[1].textContent?.trim(),
      ),
    sortBy: async (name: string) => {
      const th = Array.from(root.querySelectorAll("thead th")).find(
        (h) => h.textContent?.trim() === name,
      )!;
      await userEvent.click(th.querySelector("button")!);
      await settle();
    },
    header: (name: string) =>
      Array.from(root.querySelectorAll("thead th")).find(
        (h) => h.textContent?.trim() === name,
      )!,
    rowCheckbox: (index: number) =>
      root.querySelectorAll<HTMLInputElement>("tbody input[type=checkbox]")[
        index
      ],
    nextPage: async () => {
      const pagination = root.querySelector("minerva-pagination")!;
      await userEvent.click(
        pagination.shadowRoot!.querySelector<HTMLButtonElement>(
          'button[aria-label="Next page"]',
        )!,
      );
      await settle();
    },
  };
}

describe("data table screen (e2e)", () => {
  it("sorts, paginates and keeps the selection across pages", async () => {
    const app = await startApp();
    expect(app.names()).toHaveLength(10);
    expect(app.names()[0]).toBe("User Z");

    await app.sortBy("Name");
    expect(app.header("Name")).toHaveAttribute("aria-sort", "ascending");
    expect(app.names()[0]).toBe("User D");

    await userEvent.click(app.rowCheckbox(0));
    await userEvent.click(app.rowCheckbox(2));
    await settle();
    expect(app.table.selectedRowKeys).toHaveLength(2);
    expect(app.del.disabled).toBe(false);

    await app.nextPage();
    expect(app.table.pagination?.current).toBe(2);
    expect(app.names()[0]).toBe("User N");
    // selection is kept by row key while the rows of page 2 are shown
    expect(app.table.selectedRowKeys).toHaveLength(2);

    await app.sortBy("Name");
    expect(app.header("Name")).toHaveAttribute("aria-sort", "descending");
    expect(app.table.pagination?.current).toBe(1);
    expect(app.names()[0]).toBe("User Z");
  });

  it("select-all selects the visible page; clearing disables the bulk action", async () => {
    const app = await startApp();
    const root = app.table.shadowRoot!;
    const all = root.querySelector<HTMLInputElement>(
      "thead input[type=checkbox]",
    )!;
    await userEvent.click(all);
    await settle();
    expect(app.table.selectedRowKeys).toHaveLength(10);
    expect(app.del.disabled).toBe(false);
    await userEvent.click(all);
    await settle();
    expect(app.table.selectedRowKeys).toHaveLength(0);
    expect(app.del.disabled).toBe(true);
  });
});
