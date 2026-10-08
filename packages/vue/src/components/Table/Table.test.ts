import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/vue";
import { mount } from "@vue/test-utils";
import { renderToString } from "vue/server-renderer";
import { createSSRApp, defineComponent, h, ref } from "vue";
import {
  Table,
  TableBody,
  TableCell,
  TableCellContent,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
  computeFixedColumnLayout,
  type TableColumn,
} from ".";

interface Row {
  id: number;
}

const cols = (
  ...defs: Array<Partial<TableColumn<Row>> & { key: string }>
): TableColumn<Row>[] =>
  defs.map((d) => ({
    key: d.key,
    header: d.key,
    width: d.width,
    fixed: d.fixed,
  }));

describe("computeFixedColumnLayout", () => {
  it("accumulates left-fixed offsets from the start", () => {
    const r = computeFixedColumnLayout(
      cols(
        { key: "id", width: 80, fixed: "left" },
        { key: "name", width: 120, fixed: "left" },
        { key: "status", width: 100 },
      ),
    );
    expect(r.leftOffsets).toEqual({ id: 0, name: 80 });
    expect(r.rightOffsets).toEqual({});
    expect(r.lastLeftFixedKey).toBe("name");
    expect(r.firstRightFixedKey).toBeUndefined();
  });

  it("accumulates right-fixed offsets from the end", () => {
    const r = computeFixedColumnLayout(
      cols(
        { key: "id" },
        { key: "status", width: 100, fixed: "right" },
        { key: "actions", width: 150, fixed: "right" },
      ),
    );
    expect(r.rightOffsets).toEqual({ actions: 0, status: 150 });
    expect(r.firstRightFixedKey).toBe("status");
  });

  it('parses string widths such as "80px" and stops edges at regular columns', () => {
    const r = computeFixedColumnLayout(
      cols(
        { key: "id", width: "80px", fixed: "left" },
        { key: "name", width: "120px", fixed: "left" },
        { key: "status", width: 100 },
        { key: "extra", width: 80, fixed: "left" },
      ),
    );
    expect(r.leftOffsets).toEqual({ id: 0, name: 80, extra: 200 });
    expect(r.lastLeftFixedKey).toBe("name");
  });
});

interface Book {
  id: number;
  title: string;
  score: number;
}

const books: Book[] = [
  { id: 1, title: "Dune", score: 9 },
  { id: 2, title: "Solaris", score: 0 },
];

const bookColumns: TableColumn<Book>[] = [
  { key: "title", header: "Title" },
  { key: "score", header: "Score", align: "right" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnyTable = Table as any;

const bodyRows = () =>
  within(screen.getAllByRole("rowgroup")[1]).getAllByRole<HTMLTableRowElement>(
    "row",
  );

describe("Table (declarative rendering)", () => {
  it("renders column headers and row cells, reading row[key] by default", () => {
    render(AnyTable, { props: { columns: bookColumns, data: books } });
    expect(
      screen.getAllByRole("columnheader").map((th) => th.textContent),
    ).toEqual(["Title", "Score"]);
    expect(
      bodyRows().map((tr) => Array.from(tr.cells, (td) => td.textContent)),
    ).toEqual([
      ["Dune", "9"],
      ["Solaris", "0"],
    ]);
    const table = screen.getByRole("table");
    expect(table).toHaveAttribute("data-minerva", "data-table");
    expect(table).toHaveAttribute("data-part", "table");
    expect(table).toHaveAttribute("data-size", "medium");
    expect(table).toHaveAttribute("data-variant", "simple");
    expect(table.parentElement).toHaveAttribute("data-part", "viewport");
    expect(bodyRows()[0]).toHaveAttribute("data-part", "row");
    expect(bodyRows()[0].cells[0]).toHaveAttribute("data-part", "cell");
    expect(screen.getAllByRole("columnheader")[0]).toHaveAttribute(
      "data-part",
      "header-cell",
    );
  });

  it("server-renders scoped column headers", async () => {
    const app = createSSRApp({
      render: () =>
        h(AnyTable, {
          columns: [{ key: "name", header: "Name" }],
          data: [{ name: "A" }],
        }),
    });
    const html = await renderToString(app);
    expect(html).toMatch(/<th[^>]*scope="col"/);
    expect(html).not.toMatch(/role="region"/);
  });

  it("uses column.render with the row and its index", () => {
    const renderCell = vi.fn(
      (row: Book, index: number) => `${index + 1}. ${row.title}`,
    );
    render(AnyTable, {
      props: {
        columns: [{ key: "title", header: "Title", render: renderCell }],
        data: books,
      },
    });
    expect(renderCell).toHaveBeenCalledWith(books[1], 1);
    expect(screen.getByRole("cell", { name: "2. Solaris" })).toBeTruthy();
  });

  it("renders VNode headers and cells, and cell / header scoped slots", () => {
    render(AnyTable, {
      props: {
        columns: [
          {
            key: "title",
            header: h("em", "Book"),
            render: (row: Book) => h("strong", row.title),
          },
          { key: "score", header: "Score" },
        ],
        data: books,
      },
      slots: {
        "cell-score": ({
          row,
          index,
          value,
        }: {
          row: Book;
          index: number;
          value: number;
        }) => `${row.title}#${index}=${value}`,
        "header-score": ({ column }: { column: TableColumn<Book> }) =>
          `${String(column.header)}!`,
      },
    });
    expect(screen.getByRole("columnheader", { name: "Book" })).toBeTruthy();
    expect(screen.getByRole("columnheader", { name: "Score!" })).toBeTruthy();
    expect(bodyRows()[0].cells[0].querySelector("strong")).toHaveTextContent(
      "Dune",
    );
    expect(bodyRows()[1].cells[1]).toHaveTextContent("Solaris#1=0");
  });

  it("renders a single spanning empty row with default, custom text and slot", async () => {
    const { rerender } = render(AnyTable, {
      props: { columns: bookColumns, data: [] },
    });
    const cell = screen.getByRole("cell", { name: "No data" });
    expect(cell).toHaveClass("empty");
    expect(cell).toHaveAttribute("colspan", "2");
    expect(cell).toHaveAttribute("data-part", "empty");
    await rerender({ columns: bookColumns, data: [], emptyText: "Nothing" });
    expect(screen.getByRole("cell", { name: "Nothing" })).toBeTruthy();
    render(AnyTable, {
      props: { columns: bookColumns, data: [] },
      slots: { empty: () => h("span", "No books yet") },
    });
    expect(screen.getByText("No books yet")).toBeTruthy();
  });

  it("renders hidden skeleton rows instead of data while loading", async () => {
    const { container, rerender } = render(AnyTable, {
      props: { columns: bookColumns, data: books, loading: true },
    });
    let skeletonRows = container.querySelectorAll(
      'tbody tr[aria-hidden="true"]',
    );
    expect(skeletonRows).toHaveLength(5);
    expect(skeletonRows[0].querySelectorAll("td")).toHaveLength(2);
    expect(skeletonRows[0].querySelector(".skeleton")).toHaveAttribute(
      "data-part",
      "skeleton",
    );
    expect(screen.queryByText("Dune")).toBeNull();
    await rerender({
      columns: bookColumns,
      data: [],
      loading: true,
      loadingRows: 2,
    });
    skeletonRows = container.querySelectorAll('tbody tr[aria-hidden="true"]');
    expect(skeletonRows).toHaveLength(2);
    expect(screen.queryByText("No data")).toBeNull();
  });

  it("applies width as px width and min-width, alignment and ellipsis to header and body cells", () => {
    render(AnyTable, {
      props: {
        columns: [
          { key: "title", header: "Title", width: 120, ellipsis: true },
          { key: "score", header: "Score", width: "6rem", align: "center" },
        ],
        data: [books[0]],
      },
    });
    const [titleHead, scoreHead] = screen.getAllByRole("columnheader");
    expect(titleHead.style.width).toBe("120px");
    expect(titleHead.style.minWidth).toBe("120px");
    expect(titleHead).toHaveAttribute("data-ellipsis", "true");
    expect(scoreHead.style.width).toBe("6rem");
    expect(scoreHead.style.textAlign).toBe("center");
    expect(scoreHead).not.toHaveAttribute("data-ellipsis");
    const [titleCell, scoreCell] = bodyRows()[0].cells;
    expect(titleCell).toHaveAttribute("data-ellipsis", "true");
    expect(titleCell.style.minWidth).toBe("120px");
    expect(scoreCell.style.textAlign).toBe("center");
  });

  it("marks fixed columns with sticky offsets and edge attributes", () => {
    render(AnyTable, {
      props: {
        columns: [
          { key: "id", header: "ID", width: 60, fixed: "left" },
          { key: "title", header: "Title", width: 100, fixed: "left" },
          { key: "score", header: "Score" },
          {
            key: "ops",
            header: "Ops",
            width: 80,
            fixed: "right",
            render: () => "edit",
          },
        ],
        data: [books[0]],
      },
    });
    const [id, title, score, ops] = screen.getAllByRole("columnheader");
    expect(id).toHaveAttribute("data-fixed", "left");
    expect(id).not.toHaveAttribute("data-fixed-edge");
    expect(id.style.left).toBe("0px");
    expect(title).toHaveAttribute("data-fixed-edge", "left");
    expect(title.style.left).toBe("60px");
    expect(score).not.toHaveAttribute("data-fixed");
    expect(ops).toHaveAttribute("data-fixed", "right");
    expect(ops).toHaveAttribute("data-fixed-edge", "right");
    expect(ops.style.right).toBe("0px");
    expect(bodyRows()[0].cells[3]).toHaveAttribute("data-fixed-edge", "right");
  });

  it("shifts a leading left-fixed block by the sticky selection column", () => {
    render(AnyTable, {
      props: {
        columns: [
          { key: "id", header: "ID", width: 60, fixed: "left" },
          { key: "title", header: "Title" },
        ],
        data: [books[0]],
        rowSelection: {},
      },
    });
    const [selection, id] = screen.getAllByRole("columnheader");
    expect(selection).toHaveAttribute("data-fixed", "left");
    expect(selection).toHaveClass("selectionCell");
    expect(selection.style.left).toBe("0px");
    expect(selection.style.width).toBe("48px");
    expect(id.style.left).toBe("48px");
  });

  it("keeps row DOM identity across reorders when rowKey is provided", async () => {
    const rowKey = (row: Book) => row.id;
    const { rerender } = render(AnyTable, {
      props: { columns: bookColumns, data: books, rowKey },
    });
    const duneRow = bodyRows()[0];
    await rerender({
      columns: bookColumns,
      data: [...books].reverse(),
      rowKey,
    });
    expect(bodyRows()[1]).toBe(duneRow);
    expect(duneRow).toHaveTextContent("Dune");
  });

  it("applies size, variant and hoverable classes and forwards table attributes", () => {
    render(AnyTable, {
      props: {
        columns: bookColumns,
        data: books,
        size: "small",
        variant: "bordered",
        hoverable: true,
      },
      attrs: { "aria-label": "Books", class: "consumer" },
    });
    const table = screen.getByRole("table", { name: "Books" });
    // (`simple` / `bordered` have no rule of their own in the module)
    expect(table).toHaveClass("consumer", "table", "small", "hoverable");
    expect(table).toHaveAttribute("data-size", "small");
    expect(table).toHaveAttribute("data-variant", "bordered");
    expect(table.parentElement).toHaveClass("wrapper", "wrapperBordered");
  });

  it("maps large / striped to their classes", () => {
    render(AnyTable, {
      props: {
        columns: bookColumns,
        data: books,
        size: "large",
        variant: "striped",
      },
    });
    expect(screen.getByRole("table")).toHaveClass("large", "striped");
    expect(screen.getByRole("table").parentElement).not.toHaveClass(
      "wrapperBordered",
    );
  });

  it("defaults to medium simple non-hoverable without scroll modes", () => {
    render(AnyTable, {
      props: { columns: bookColumns, data: books },
      attrs: { "aria-label": "Books" },
    });
    const table = screen.getByRole("table");
    expect(table).toHaveClass("table", "medium");
    expect(table).not.toHaveClass("hoverable");
    expect(table).not.toHaveClass("scrollX");
    expect(table.parentElement?.getAttribute("style") ?? "").toBe("");
    expect(table.getAttribute("style")).toBeNull();
  });
});

describe("TableRoot scroll and compound parts", () => {
  it("switches to scroll-x mode with a min-width (style attrs win)", () => {
    render(TableRoot, {
      props: { scroll: { x: 900 } },
      attrs: { style: { color: "red" }, "aria-label": "T" },
      slots: { default: () => h("tbody") },
    });
    const table = screen.getByRole("table");
    expect(table).toHaveClass("scrollX");
    expect(table.style.minWidth).toBe("900px");
    expect(table.style.color).toBe("red");
  });

  it("bounds the wrapper height in scroll-y mode", () => {
    render(TableRoot, {
      props: { scroll: { y: "50vh" } },
      attrs: { "aria-label": "T" },
      slots: { default: () => h("tbody") },
    });
    const wrapper = screen.getByRole("table").parentElement as HTMLElement;
    expect(wrapper).toHaveClass("wrapperScrollY");
    expect(wrapper.style.maxHeight).toBe("50vh");
    expect(wrapper.style.overflowY).toBe("auto");
  });

  it("exposes the table / wrapper elements and renders every compound part", () => {
    const root = ref<InstanceType<typeof TableRoot> | null>(null);
    const Host = defineComponent(
      () => () =>
        h(TableRoot, { ref: root }, () => [
          h(TableHead, { class: "head" }, () =>
            h(TableRow, null, () =>
              h(TableHeader, { scope: "col" }, () => "H"),
            ),
          ),
          h(TableBody, { class: "body" }, () =>
            h(TableRow, null, () => h(TableCell, { colspan: 2 }, () => "C")),
          ),
        ]),
    );
    const wrapper = mount(Host, { attachTo: document.body });
    expect(root.value?.table?.tagName).toBe("TABLE");
    expect(root.value?.wrapper?.tagName).toBe("DIV");
    expect(wrapper.get("thead").classes()).toContain("head");
    expect(wrapper.get("tbody").classes()).toContain("body");
    expect(wrapper.get("th").attributes("scope")).toBe("col");
    expect(wrapper.get("td").attributes("colspan")).toBe("2");
  });

  it("derives the row / header-cell item hooks of the compound parts from aria-selected / aria-sort", () => {
    render(
      defineComponent(
        () => () =>
          h(TableRoot, null, () => [
            h(TableHead, null, () =>
              h(TableRow, null, () => [
                h(
                  TableHeader,
                  { scope: "col", "aria-sort": "descending" },
                  () => "Sorted",
                ),
                h(
                  TableHeader,
                  { scope: "col", "aria-sort": "none" },
                  () => "Sortable",
                ),
                h(
                  TableHeader,
                  { scope: "col", "aria-sort": "other" },
                  () => "Other",
                ),
                h(TableHeader, { scope: "col" }, () => "Plain"),
              ]),
            ),
            h(TableBody, null, () => [
              h(
                TableRow,
                { "aria-selected": true, "data-testid": "selected" },
                () => h(TableCell, null, () => "A"),
              ),
              h(
                TableRow,
                { "aria-selected": "false", "data-testid": "unselected" },
                () => h(TableCell, null, () => "B"),
              ),
            ]),
          ]),
      ),
    );
    const header = (name: string) => screen.getByRole("columnheader", { name });
    expect(header("Sorted")).toHaveAttribute("data-sort", "descending");
    expect(header("Sortable")).toHaveAttribute("data-sort", "none");
    expect(header("Other")).not.toHaveAttribute("data-sort");
    expect(header("Plain")).not.toHaveAttribute("data-sort");
    expect(screen.getByTestId("selected")).toHaveAttribute("data-selected", "");
    expect(screen.getByTestId("unselected")).not.toHaveAttribute(
      "data-selected",
    );
  });
});

describe("TableCellContent", () => {
  it("renders the secondary line only when set and defaults maxWidth to 360px", async () => {
    const { container, rerender } = render(TableCellContent, {
      props: { primary: "Dune", secondary: "Herbert" },
    });
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("cellContent");
    expect(root).toHaveAttribute("data-minerva", "table-cell-content");
    expect(root).toHaveAttribute("data-part", "root");
    expect(root.querySelector(".cellPrimary")).toHaveClass("cellStrong");
    expect(root.querySelector(".cellPrimary")).toHaveAttribute(
      "data-part",
      "primary",
    );
    expect(root.querySelector(".cellSecondary")).toHaveTextContent("Herbert");
    expect(root.querySelector(".cellSecondary")).toHaveAttribute(
      "data-part",
      "secondary",
    );
    expect(root.style.maxWidth).toBe("360px");
    await rerender({ primary: "Dune", secondary: undefined });
    expect(root.querySelector(".cellSecondary")).toBeNull();
    expect(root.querySelector(".cellPrimary")).not.toHaveClass("cellStrong");
    expect(root.querySelector(".cellPrimary")?.tagName).toBe("DIV");
  });

  it("accepts string maxWidth, lets style override it and forwards attributes", async () => {
    const { container, rerender } = render(TableCellContent, {
      props: { primary: "x", maxWidth: "20ch" },
      attrs: { class: "consumer", title: "full" },
    });
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.maxWidth).toBe("20ch");
    expect(root).toHaveClass("consumer", "cellContent");
    expect(root).toHaveAttribute("title", "full");
    const styled = render(TableCellContent, {
      props: { primary: "x", maxWidth: "20ch" },
      attrs: { style: { maxWidth: "none" } },
    });
    expect(
      (styled.container.firstElementChild as HTMLElement).style.maxWidth,
    ).toBe("none");
    await rerender({ primary: "y", maxWidth: 240 });
    expect(root.style.maxWidth).toBe("240px");
  });

  it("renders zero values, semantic code (as text) and slots", () => {
    const { container } = render(TableCellContent, {
      props: { primary: 0, secondary: 0 },
    });
    expect(container.querySelector(".cellPrimary")?.textContent).toBe("0");
    expect(container.querySelector(".cellSecondary")?.textContent).toBe("0");
    const code = render(TableCellContent, {
      props: { primary: "<img src=x>", monospace: true },
    });
    expect(code.container.querySelector("code")?.textContent).toBe(
      "<img src=x>",
    );
    expect(code.container.querySelector("code")).toHaveClass("cellMono");
    expect(code.container.querySelector("img")).toBeNull();
    expect(code.container.querySelector(".cellSecondary")).toBeNull();
    const slotted = render(TableCellContent, {
      slots: { default: () => "Main", secondary: () => h("i", "Sub") },
    });
    expect(slotted.container.querySelector(".cellPrimary")).toHaveTextContent(
      "Main",
    );
    expect(
      slotted.container.querySelector(".cellSecondary i"),
    ).toHaveTextContent("Sub");
  });
});
