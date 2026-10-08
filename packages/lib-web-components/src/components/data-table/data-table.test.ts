import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { html } from "lit";
import {
  MinervaDataTable,
  MinervaTableCellContent,
  type TableColumn,
} from "./data-table";
import { computeFixedColumnLayout } from "@minerva/core";
import "../../elements/data-table";
import { MinervaPagination } from "../pagination/pagination";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

interface Person {
  id: number;
  name: string;
  age: number;
}

const people: Person[] = [
  { id: 1, name: "Charlie", age: 35 },
  { id: 2, name: "alice", age: 20 },
  { id: 3, name: "Bob", age: 41 },
];

const personColumns: TableColumn<Person>[] = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name", sortable: true },
  { key: "age", header: "Age", sortable: (a, b) => a.age - b.age },
];

const table = () =>
  document.querySelector<MinervaDataTable<Person>>("minerva-data-table")!;
const root = () => table().shadowRoot!;
const bodyRows = () =>
  Array.from(root().querySelectorAll<HTMLTableRowElement>("tbody tr"));
const cellTexts = (col: number) =>
  bodyRows().map((tr) => tr.cells[col].textContent?.trim());
const header = (name: string) =>
  Array.from(root().querySelectorAll<HTMLElement>("thead th")).find(
    (th) => th.textContent?.trim() === name,
  )!;
const sortButton = (name: string) =>
  header(name).querySelector<HTMLButtonElement>("button")!;

async function setup<R extends object = Person>(
  props: Partial<MinervaDataTable<R>> = {},
  attrs = "",
) {
  const el = await mount<MinervaDataTable<R>>(
    `<minerva-data-table ${attrs}></minerva-data-table>`,
  );
  Object.assign(el, {
    columns: personColumns,
    rows: people,
    rowKey: "id",
    ...props,
  });
  await settle();
  return el;
}

describe("computeFixedColumnLayout (copied from lib-core)", () => {
  it("accumulates offsets and finds the edge columns", () => {
    expect(
      computeFixedColumnLayout([
        { key: "a", width: 60, fixed: "left" },
        { key: "b", width: "100px", fixed: "left" },
        { key: "c" },
        { key: "d", width: 80, fixed: "right" },
        { key: "e", fixed: "right" },
      ]),
    ).toEqual({
      leftOffsets: { a: 0, b: 60 },
      rightOffsets: { e: 0, d: 0 },
      lastLeftFixedKey: "b",
      firstRightFixedKey: "d",
    });
  });
});

describe("<minerva-data-table>", () => {
  it("registers itself, its pagination dependency and the cell content element", () => {
    expect(customElements.get("minerva-data-table")).toBe(MinervaDataTable);
    expect(customElements.get("minerva-pagination")).toBe(MinervaPagination);
    expect(customElements.get("minerva-table-cell-content")).toBe(
      MinervaTableCellContent,
    );
  });

  it("renders headers and cells, reading row[key] by default", async () => {
    await setup();
    const headers = Array.from(root().querySelectorAll("thead th"));
    expect(headers.map((th) => th.textContent?.trim())).toEqual([
      "ID",
      "Name",
      "Age",
    ]);
    expect(headers.every((th) => th.getAttribute("scope") === "col")).toBe(
      true,
    );
    expect(cellTexts(1)).toEqual(["Charlie", "alice", "Bob"]);
    const t = $(table(), "table");
    expect(t.className.trim()).toBe("table medium simple");
    expect($(table(), ".dataTable")).not.toHaveAttribute("aria-busy");
  });

  it("uses column.render returning strings, nodes or templates", async () => {
    const node = document.createElement("em");
    node.textContent = "node";
    const render = vi.fn((row: Person, i: number) =>
      i === 0
        ? `${i + 1}. ${row.name}`
        : i === 1
          ? html`<b>${row.name}</b>`
          : node,
    );
    await setup({ columns: [{ key: "name", header: "Name", render }] });
    expect(render).toHaveBeenCalledWith(people[1], 1);
    expect(cellTexts(0)).toEqual(["1. Charlie", "alice", "node"]);
    expect(bodyRows()[1].querySelector("b")).toBeTruthy();
    expect(bodyRows()[2].contains(node)).toBe(true);
  });

  it("renders a spanning empty row with default, custom or slotted text", async () => {
    const el = await setup({ rows: [] });
    const cell = root().querySelector("td.empty")!;
    expect(cell).toHaveAttribute("colspan", "3");
    expect(cell.textContent?.trim()).toBe("No data");
    el.emptyText = "No people yet";
    el.selectable = true;
    await settle();
    expect(root().querySelector("td.empty")).toHaveAttribute("colspan", "4");
    expect(root().querySelector("td.empty")?.textContent?.trim()).toBe(
      "No people yet",
    );
    // select-all is disabled without rows
    expect(
      root().querySelector<HTMLInputElement>("thead input")!.disabled,
    ).toBe(true);
  });

  it("renders hidden skeleton rows while loading and marks itself busy", async () => {
    const el = await setup({ loading: true });
    let skeletons = root().querySelectorAll('tbody tr[aria-hidden="true"]');
    expect(skeletons).toHaveLength(5);
    expect(skeletons[0].querySelectorAll("td")).toHaveLength(3);
    expect(skeletons[0].querySelector(".skeleton")).toBeTruthy();
    expect(root().textContent).not.toContain("Charlie");
    expect($(el, ".dataTable")).toHaveAttribute("aria-busy", "true");
    el.loadingRows = 2;
    el.rows = [];
    await settle();
    skeletons = root().querySelectorAll('tbody tr[aria-hidden="true"]');
    expect(skeletons).toHaveLength(2);
    expect(root().querySelector("td.empty")).toBe(null);
    // no tab stops in the skeleton
    expect(root().querySelector("tbody button, tbody input")).toBe(null);
  });

  it("applies width / min-width, alignment and ellipsis to header and body cells", async () => {
    await setup({
      columns: [
        { key: "name", header: "Name", width: 120, ellipsis: true },
        { key: "age", header: "Age", width: "6rem", align: "center" },
      ],
    });
    const [nameHead, ageHead] = Array.from(
      root().querySelectorAll<HTMLElement>("thead th"),
    );
    expect(nameHead.style.width).toBe("120px");
    expect(nameHead.style.minWidth).toBe("120px");
    expect(nameHead).toHaveAttribute("data-ellipsis", "true");
    expect(ageHead.style.width).toBe("6rem");
    expect(ageHead.style.textAlign).toBe("center");
    expect(ageHead).not.toHaveAttribute("data-ellipsis");
    const [nameCell, ageCell] = Array.from(bodyRows()[0].cells);
    expect(nameCell).toHaveAttribute("data-ellipsis", "true");
    expect(ageCell.style.textAlign).toBe("center");
  });

  it("marks fixed columns with sticky offsets and edge attributes", async () => {
    await setup({
      columns: [
        { key: "id", header: "ID", width: 60, fixed: "left" },
        { key: "name", header: "Name", width: 100, fixed: "left" },
        { key: "age", header: "Age" },
        {
          key: "ops",
          header: "Ops",
          width: 80,
          fixed: "right",
          render: () => "edit",
        },
      ],
    });
    const [id, name, age, ops] = Array.from(
      root().querySelectorAll<HTMLElement>("thead th"),
    );
    expect(id).toHaveAttribute("data-fixed", "left");
    expect(id).not.toHaveAttribute("data-fixed-edge");
    expect(id.style.left).toBe("0px");
    expect(name).toHaveAttribute("data-fixed-edge", "left");
    expect(name.style.left).toBe("60px");
    expect(age).not.toHaveAttribute("data-fixed");
    expect(ops).toHaveAttribute("data-fixed-edge", "right");
    expect(ops.style.right).toBe("0px");
    expect(bodyRows()[0].cells[3]).toHaveAttribute("data-fixed-edge", "right");
  });

  it("shifts left-fixed columns after a fixed selection column", async () => {
    await setup({
      selectable: true,
      columns: [
        { key: "id", header: "ID", width: 60, fixed: "left" },
        { key: "name", header: "Name" },
      ],
    });
    const [selection, id] = Array.from(
      root().querySelectorAll<HTMLElement>("thead th"),
    );
    expect(selection).toHaveAttribute("data-fixed", "left");
    expect(selection.style.left).toBe("0px");
    expect(id.style.left).toBe("48px");
  });

  it("keeps row DOM identity across reorders with row-key", async () => {
    const el = await setup();
    const charlie = bodyRows()[0];
    el.rows = [...people].reverse();
    await settle();
    expect(bodyRows()[2]).toBe(charlie);
  });

  it("applies size / variant / hoverable / scroll classes", async () => {
    const el = await setup(
      {},
      'size="small" variant="bordered" hoverable scroll-x="600" scroll-y="200"',
    );
    const t = $(el, "table");
    for (const c of ["small", "bordered", "hoverable", "scrollX"]) {
      expect(t).toHaveClass(c);
    }
    expect(t.style.minWidth).toBe("600px");
    const wrapper = $(el, ".wrapper");
    expect(wrapper).toHaveClass("wrapperBordered");
    expect(wrapper).toHaveClass("wrapperScrollY");
    expect(wrapper.style.maxHeight).toBe("200px");
    el.variant = "striped";
    el.size = "large";
    await settle();
    expect(el.getAttribute("variant")).toBe("striped");
    expect(t).toHaveClass("striped");
    expect(t).toHaveClass("large");
  });

  describe("scroll region", () => {
    it("is not a region or tab stop without scrolling", async () => {
      const el = await setup();
      const wrapper = $(el, ".wrapper");
      expect(wrapper).not.toHaveAttribute("role");
      expect(wrapper).not.toHaveAttribute("tabindex");
      expect($(el, "table")).not.toHaveAttribute("tabindex");
    });

    it("makes the scrolling wrapper a focusable region named after the table", async () => {
      const el = await setup({}, 'aria-label="People" scroll-x="800"');
      const wrapper = $(el, ".wrapper");
      expect(wrapper).toHaveAttribute("role", "region");
      expect(wrapper).toHaveAttribute("tabindex", "0");
      expect(wrapper).toHaveAttribute("aria-label", "People");
      expect($(el, "table")).toHaveAttribute("aria-label", "People");
    });

    it("uses a localized default name and resolves aria-labelledby", async () => {
      await mount(
        `<div lang="fr"><minerva-data-table scroll-y="100"></minerva-data-table></div>`,
        "minerva-data-table",
      );
      const name = $(table(), ".wrapper").getAttribute("aria-label");
      expect(name).toBeTruthy();
      expect(name).not.toBe("Scrollable table");
      await mount(
        `<h2 id="t">Team</h2><minerva-data-table aria-labelledby="t" scroll-y="100"></minerva-data-table>`,
        "minerva-data-table",
      );
      expect($(table(), ".wrapper")).toHaveAttribute("aria-label", "Team");
    });

    it("becomes a region when the content overflows", async () => {
      vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(
        900,
      );
      vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(
        300,
      );
      const el = await setup();
      await settle();
      expect($(el, ".wrapper")).toHaveAttribute("role", "region");
    });
  });

  describe("sorting", () => {
    it("renders sort buttons only in sortable headers, with aria-sort", async () => {
      await setup();
      expect(sortButton("Name")).toHaveAttribute("type", "button");
      expect(header("Name")).toHaveAttribute("aria-sort", "none");
      expect(header("Age")).toHaveAttribute("aria-sort", "none");
      expect(header("ID")).not.toHaveAttribute("aria-sort");
      expect(header("Name").getAttribute("part")).toBe(
        "header-cell header-cell--sort-none",
      );
      expect(header("ID").getAttribute("part")).toBe("header-cell");
      expect(header("ID").querySelector("button")).toBe(null);
      expect(header("Name").querySelector("svg")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it("cycles ascend, descend and none with the keyboard", async () => {
      const user = userEvent.setup();
      const el = await setup();
      const onSort = vi.fn();
      el.addEventListener("minerva-sort-change", (e) =>
        onSort((e as CustomEvent).detail),
      );
      sortButton("Name").focus();
      await user.keyboard("{Enter}");
      await settle();
      expect(header("Name")).toHaveAttribute("aria-sort", "ascending");
      expect(header("Name").getAttribute("part")).toBe(
        "header-cell header-cell--sort-ascending",
      );
      expect(cellTexts(1)).toEqual(["alice", "Bob", "Charlie"]);
      await user.keyboard(" ");
      await settle();
      expect(header("Name")).toHaveAttribute("aria-sort", "descending");
      expect(header("Name").getAttribute("part")).toBe(
        "header-cell header-cell--sort-descending",
      );
      expect(cellTexts(1)).toEqual(["Charlie", "Bob", "alice"]);
      await user.keyboard("{Enter}");
      await settle();
      expect(header("Name")).toHaveAttribute("aria-sort", "none");
      expect(header("Name").getAttribute("part")).toBe(
        "header-cell header-cell--sort-none",
      );
      expect(cellTexts(1)).toEqual(["Charlie", "alice", "Bob"]);
      expect(onSort.mock.calls).toEqual([
        [{ key: "name", order: "ascend" }],
        [{ key: "name", order: "descend" }],
        [{ key: "name", order: null }],
      ]);
    });

    it("uses a compare function and switches columns", async () => {
      const user = userEvent.setup();
      await setup({ sortState: { key: "name", order: "descend" } });
      expect(cellTexts(1)).toEqual(["Charlie", "Bob", "alice"]);
      await user.click(sortButton("Age"));
      await settle();
      expect(header("Age")).toHaveAttribute("aria-sort", "ascending");
      expect(header("Name")).toHaveAttribute("aria-sort", "none");
      expect(cellTexts(1)).toEqual(["alice", "Charlie", "Bob"]);
    });

    it("sorts empty values last and numeric strings naturally", async () => {
      const user = userEvent.setup();
      await setup<{ code?: string }>({
        columns: [{ key: "code", header: "Code", sortable: true }],
        rows: [
          { code: "item10" },
          { code: undefined },
          { code: "item2" },
          { code: "item1" },
        ],
        rowKey: undefined,
      });
      await user.click(sortButton("Code"));
      await settle();
      expect(cellTexts(0)).toEqual(["item1", "item2", "item10", ""]);
    });

    it("keeps the sort when minerva-sort-change is canceled (controlled)", async () => {
      const user = userEvent.setup();
      const el = await setup();
      el.addEventListener("minerva-sort-change", (e) => e.preventDefault());
      await user.click(sortButton("Name"));
      await settle();
      expect(header("Name")).toHaveAttribute("aria-sort", "none");
      el.sortState = { key: "name", order: "ascend" };
      await settle();
      expect(cellTexts(1)).toEqual(["alice", "Bob", "Charlie"]);
    });

    it("does not reorder rows with manual-sort", async () => {
      const user = userEvent.setup();
      await setup({}, "manual-sort");
      await user.click(sortButton("Name"));
      await settle();
      expect(header("Name")).toHaveAttribute("aria-sort", "ascending");
      expect(cellTexts(1)).toEqual(["Charlie", "alice", "Bob"]);
    });
  });

  describe("row selection", () => {
    const checkbox = (i: number) =>
      bodyRows()[i].querySelector<HTMLInputElement>("input")!;
    const selectAll = () =>
      root().querySelector<HTMLInputElement>("thead input")!;

    it("toggles a row with Space and reports keys and rows", async () => {
      const user = userEvent.setup();
      const el = await setup({
        selectable: true,
        getRowLabel: (row) => row.name,
      });
      const onSelection = vi.fn();
      el.addEventListener("minerva-selection-change", (e) =>
        onSelection((e as CustomEvent).detail),
      );
      expect(checkbox(0)).toHaveAttribute("aria-label", "Select row Charlie");
      expect(selectAll()).toHaveAttribute("aria-label", "Select all rows");
      checkbox(1).focus();
      await user.keyboard(" ");
      await settle();
      expect(onSelection).toHaveBeenLastCalledWith({
        selectedRowKeys: [2],
        selectedRows: [people[1]],
      });
      expect(el.selectedRowKeys).toEqual([2]);
      expect(bodyRows()[1]).toHaveAttribute("aria-selected", "true");
      expect(bodyRows()[1].getAttribute("part")).toBe("row row--selected");
      expect(bodyRows()[0].getAttribute("part")).toBe("row");
      expect(selectAll().indeterminate).toBe(true);
    });

    it("labels rows with the row key by default", async () => {
      await setup({ selectable: true });
      expect(checkbox(2)).toHaveAttribute("aria-label", "Select row 3");
    });

    it("selects and clears all rows, skipping disabled and keeping off-page keys", async () => {
      const user = userEvent.setup();
      const el = await setup({
        selectable: true,
        isRowDisabled: (row) => row.id === 3,
        selectedRowKeys: [99],
      });
      expect(checkbox(2)).toBeDisabled();
      await user.click(selectAll());
      await settle();
      expect(el.selectedRowKeys).toEqual([99, 1, 2]);
      expect(selectAll().checked).toBe(true);
      await user.click(selectAll());
      await settle();
      expect(el.selectedRowKeys).toEqual([99]);
    });

    it("keeps the selection when minerva-selection-change is canceled", async () => {
      const user = userEvent.setup();
      const el = await setup({ selectable: true });
      el.addEventListener("minerva-selection-change", (e) =>
        e.preventDefault(),
      );
      await user.click(checkbox(0));
      await settle();
      expect(el.selectedRowKeys).toEqual([]);
      expect(checkbox(0).checked).toBe(false);
    });

    it("keeps the selection on the same rows after sorting", async () => {
      const user = userEvent.setup();
      await setup({ selectable: true, selectedRowKeys: [2] });
      await user.click(sortButton("Name"));
      await settle();
      expect(cellTexts(2)[0]).toBe("alice");
      expect(checkbox(0).checked).toBe(true);
    });
  });

  describe("states and pagination", () => {
    it("announces errors as an alert and offers a labelled retry", async () => {
      const user = userEvent.setup();
      const el = await setup(
        { pagination: { total: 30 } },
        'error="Failed to load" retryable retry-label="Try again"',
      );
      const onRetry = vi.fn();
      el.addEventListener("minerva-retry", onRetry);
      expect($(el, '[role="alert"]').textContent).toContain("Failed to load");
      expect(root().querySelector("table")).toBe(null);
      expect(root().querySelector("minerva-pagination")).toBe(null);
      const retry = $<HTMLButtonElement>(el, "[part=retry-button]");
      expect(retry.textContent?.trim()).toBe("Try again");
      expect(retry).toHaveClass("customButton");
      retry.focus();
      await user.keyboard("{Enter}");
      await user.keyboard(" ");
      expect(onRetry).toHaveBeenCalledTimes(2);
    });

    it("uses the localized retry label and omits it unless retryable", async () => {
      const el = await setup({}, 'error="Failed" retryable');
      expect($(el, "[part=retry-button]").textContent?.trim()).toBe("Retry");
      el.retryable = false;
      await settle();
      expect(root().querySelector("button")).toBe(null);
    });

    it("shows skeletons (not the error) while loading", async () => {
      const el = await setup({}, 'error="Boom" loading');
      expect(root().querySelector('[role="alert"]')).toBe(null);
      expect($(el, ".dataTable")).toHaveAttribute("aria-busy", "true");
    });

    it("renders the pagination and forwards / follows page changes", async () => {
      const user = userEvent.setup();
      const el = await setup({
        columns: [{ key: "name", header: "Name" }],
        rows: [{ id: 11, name: "Page two row", age: 1 }],
        pagination: { current: 2, pageSize: 10, total: 30 },
      });
      const onPage = vi.fn();
      el.addEventListener("minerva-page-change", (e) =>
        onPage((e as CustomEvent).detail),
      );
      const pagination =
        root().querySelector<MinervaPagination>("minerva-pagination")!;
      expect(pagination.current).toBe(2);
      expect(pagination.total).toBe(30);
      expect(root().querySelector("tbody")?.textContent).toContain(
        "Page two row",
      );
      const next = pagination.shadowRoot!.querySelector<HTMLButtonElement>(
        'button[aria-label="Next page"]',
      )!;
      await user.click(next);
      await settle();
      expect(onPage).toHaveBeenCalledWith({ page: 3, pageSize: 10 });
      expect(el.pagination?.current).toBe(3);
      expect(pagination.current).toBe(3);
    });
  });

  it("operates interactive cell content with Enter and Space", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    await setup({
      columns: [
        {
          key: "edit",
          header: "Edit",
          render: (row) =>
            html`<button type="button" @click=${() => onEdit(row.id)}>
              Edit ${row.name}
            </button>`,
        },
      ],
    });
    bodyRows()[0].querySelector("button")!.focus();
    await user.keyboard("{Enter}");
    bodyRows()[1].querySelector("button")!.focus();
    await user.keyboard(" ");
    expect(onEdit.mock.calls).toEqual([[1], [2]]);
  });

  it("warns in development about duplicate row keys", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    await setup({ rows: [people[0], people[0]] });
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("duplicate"));
  });
});

describe("<minerva-table-cell-content>", () => {
  it("renders the secondary line only when set and defaults max-width to 360px", async () => {
    const el = await mount<MinervaTableCellContent>(
      `<minerva-table-cell-content primary="Main"></minerva-table-cell-content>`,
    );
    const base = $(el, ".cellContent");
    expect(base.style.maxWidth).toBe("360px");
    expect($(el, ".cellPrimary").textContent?.trim()).toBe("Main");
    expect(el.shadowRoot!.querySelector(".cellSecondary")).toBe(null);
    expect($(el, ".cellPrimary")).not.toHaveClass("cellStrong");
    el.secondary = "Sub";
    el.maxWidth = "20rem";
    await settle();
    expect($(el, ".cellSecondary").textContent?.trim()).toBe("Sub");
    expect($(el, ".cellPrimary")).toHaveClass("cellStrong");
    expect(base.style.maxWidth).toBe("20rem");
  });

  it("renders monospace content as <code> and accepts slots", async () => {
    const el = await mount<MinervaTableCellContent>(
      `<minerva-table-cell-content monospace>abc<span slot="secondary">0</span></minerva-table-cell-content>`,
    );
    expect($(el, "code.cellPrimary.cellMono")).toBeTruthy();
    expect($(el, ".cellSecondary slot[name=secondary]")).toBeTruthy();
  });
});
