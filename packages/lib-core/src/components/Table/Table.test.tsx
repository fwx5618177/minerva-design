import { createRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { compile } from "sass";
import { join } from "node:path";
import {
  DataTable,
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

  it("handles fixed columns on both sides around regular columns", () => {
    const r = computeFixedColumnLayout(
      cols(
        { key: "id", width: 60, fixed: "left" },
        { key: "name", width: 120, fixed: "left" },
        { key: "status", width: 100 },
        { key: "notes", width: 200 },
        { key: "actions", width: 140, fixed: "right" },
      ),
    );
    expect(r.leftOffsets).toEqual({ id: 0, name: 60 });
    expect(r.rightOffsets).toEqual({ actions: 0 });
    expect(r.lastLeftFixedKey).toBe("name");
    expect(r.firstRightFixedKey).toBe("actions");
  });

  it("returns empty offsets without fixed columns", () => {
    const r = computeFixedColumnLayout(
      cols({ key: "a" }, { key: "b" }, { key: "c" }),
    );
    expect(r.leftOffsets).toEqual({});
    expect(r.rightOffsets).toEqual({});
    expect(r.lastLeftFixedKey).toBeUndefined();
    expect(r.firstRightFixedKey).toBeUndefined();
  });

  it("treats a missing width as 0 (does not crash)", () => {
    const r = computeFixedColumnLayout(
      cols(
        { key: "id", fixed: "left" },
        { key: "name", width: 120, fixed: "left" },
      ),
    );
    expect(r.leftOffsets).toEqual({ id: 0, name: 0 });
  });

  it('parses string widths such as "80px"', () => {
    const r = computeFixedColumnLayout(
      cols(
        { key: "id", width: "80px", fixed: "left" },
        { key: "name", width: "120px", fixed: "left" },
      ),
    );
    expect(r.leftOffsets).toEqual({ id: 0, name: 80 });
  });

  it("parses percentages numerically and treats unparsable widths as 0", () => {
    const r = computeFixedColumnLayout(
      cols(
        { key: "id", width: "10%", fixed: "left" },
        { key: "name", width: "20%", fixed: "left" },
      ),
    );
    expect(r.leftOffsets).toEqual({ id: 0, name: 10 });
    const auto = computeFixedColumnLayout(
      cols(
        { key: "id", width: "auto", fixed: "left" },
        { key: "name", fixed: "left" },
      ),
    );
    expect(auto.leftOffsets).toEqual({ id: 0, name: 0 });
  });

  it("stops the edge key at the first non-fixed column", () => {
    const r = computeFixedColumnLayout(
      cols(
        { key: "id", width: 60, fixed: "left" },
        { key: "name", width: 120, fixed: "left" },
        { key: "status", width: 100 },
        { key: "extra", width: 80, fixed: "left" },
      ),
    );
    expect(r.lastLeftFixedKey).toBe("name");
    const right = computeFixedColumnLayout(
      cols(
        { key: "a", width: 60, fixed: "right" },
        { key: "b", width: 100 },
        { key: "c", width: 80, fixed: "right" },
      ),
    );
    expect(right.firstRightFixedKey).toBe("c");
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

const bodyRows = () =>
  within(screen.getAllByRole("rowgroup")[1]).getAllByRole<HTMLTableRowElement>(
    "row",
  );

describe("Table (declarative rendering)", () => {
  it("renders column headers and row cells, reading row[key] by default", () => {
    render(<Table columns={bookColumns} data={books} />);
    expect(
      screen.getAllByRole("columnheader").map((th) => th.textContent),
    ).toEqual(["Title", "Score"]);
    expect(
      bodyRows().map((tr) => Array.from(tr.cells, (td) => td.textContent)),
    ).toEqual([
      ["Dune", "9"],
      ["Solaris", "0"],
    ]);
  });

  it("declarative table headers explicitly identify their columns", () => {
    const html = renderToStaticMarkup(
      <Table
        columns={[{ key: "name", header: "Name" }]}
        data={[{ name: "A" }]}
      />,
    );
    expect(html).toMatch(/<th[^>]*scope="col"/);
  });

  it("uses column.render with the row and its index", () => {
    const renderCell = vi.fn(
      (row: Book, index: number) => `${index + 1}. ${row.title}`,
    );
    render(
      <Table
        columns={[{ key: "title", header: "Title", render: renderCell }]}
        data={books}
      />,
    );
    expect(renderCell).toHaveBeenCalledWith(books[1], 1);
    expect(
      screen.getByRole("cell", { name: "2. Solaris" }),
    ).toBeInTheDocument();
  });

  it("renders a single spanning empty row with default and custom text", () => {
    const { rerender } = render(<Table columns={bookColumns} data={[]} />);
    const cell = screen.getByRole("cell", { name: "No data" });
    expect(cell).toHaveClass("ui-table-empty", "empty");
    expect(cell).toHaveAttribute("colspan", "2");
    rerender(
      <Table
        columns={bookColumns}
        data={[]}
        emptyText={<span>No books yet</span>}
      />,
    );
    expect(bodyRows()).toHaveLength(1);
    expect(screen.getByText("No books yet")).toBeInTheDocument();
  });

  it("renders hidden skeleton rows instead of data while loading", () => {
    const { container, rerender } = render(
      <Table columns={bookColumns} data={books} loading />,
    );
    let skeletonRows = container.querySelectorAll(
      'tbody tr[aria-hidden="true"]',
    );
    expect(skeletonRows).toHaveLength(5);
    expect(skeletonRows[0].querySelectorAll("td")).toHaveLength(2);
    expect(skeletonRows[0].querySelector(".ui-table-skeleton")).not.toBeNull();
    expect(screen.queryByText("Dune")).toBeNull();
    rerender(<Table columns={bookColumns} data={[]} loading loadingRows={2} />);
    skeletonRows = container.querySelectorAll('tbody tr[aria-hidden="true"]');
    expect(skeletonRows).toHaveLength(2);
    expect(screen.queryByText("No data")).toBeNull();
  });

  it("applies width as px width and min-width, alignment and ellipsis to header and body cells", () => {
    render(
      <Table
        columns={[
          { key: "title", header: "Title", width: 120, ellipsis: true },
          { key: "score", header: "Score", width: "6rem", align: "center" },
        ]}
        data={[books[0]]}
      />,
    );
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
    render(
      <Table<Book>
        columns={[
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
        ]}
        data={[books[0]]}
      />,
    );
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
    const opsCell = bodyRows()[0].cells[3];
    expect(opsCell).toHaveAttribute("data-fixed-edge", "right");
  });

  it("keeps row DOM identity across reorders when rowKey is provided", () => {
    const rowKey = (row: Book) => row.id;
    const { rerender } = render(
      <Table columns={bookColumns} data={books} rowKey={rowKey} />,
    );
    const duneRow = bodyRows()[0];
    rerender(
      <Table
        columns={bookColumns}
        data={[...books].reverse()}
        rowKey={rowKey}
      />,
    );
    expect(bodyRows()[1]).toBe(duneRow);
    expect(duneRow).toHaveTextContent("Dune");
  });

  it("applies size, variant and hoverable classes and forwards table attributes", () => {
    render(
      <Table
        columns={bookColumns}
        data={books}
        size="small"
        variant="bordered"
        hoverable
        aria-label="Books"
        className="consumer"
      />,
    );
    const table = screen.getByRole("table", { name: "Books" });
    expect(table).toHaveClass(
      "ui-table",
      "ui-table-size-sm",
      "ui-table-variant-bordered",
      "ui-table-hoverable",
      "consumer",
      "table",
      "small",
      "bordered",
      "hoverable",
    );
    expect(table.parentElement).toHaveClass(
      "ui-table-wrapper",
      "ui-table-variant-bordered",
      "wrapper",
      "wrapperBordered",
    );
  });

  it("maps large / striped to the stable hooks", () => {
    render(
      <Table
        columns={bookColumns}
        data={books}
        size="large"
        variant="striped"
        aria-label="Books"
      />,
    );
    expect(screen.getByRole("table")).toHaveClass(
      "ui-table-size-lg",
      "ui-table-variant-striped",
      "large",
      "striped",
    );
    expect(screen.getByRole("table").parentElement).not.toHaveClass(
      "ui-table-variant-bordered",
    );
  });

  it("defaults to medium simple non-hoverable without scroll modes", () => {
    render(<Table columns={bookColumns} data={books} aria-label="Books" />);
    const table = screen.getByRole("table");
    expect(table).toHaveClass("ui-table-size-md", "ui-table-variant-simple");
    expect(table).not.toHaveClass("ui-table-hoverable");
    expect(table).not.toHaveClass("ui-table-scroll-x");
    expect(table.parentElement?.getAttribute("style") ?? "").toBe("");
    expect(table.getAttribute("style")).toBeNull();
  });
});

describe("TableRoot scroll and compound parts", () => {
  it("switches to scroll-x mode with a min-width", () => {
    render(
      <TableRoot scroll={{ x: 900 }} style={{ color: "red" }} aria-label="T">
        <tbody />
      </TableRoot>,
    );
    const table = screen.getByRole("table");
    expect(table).toHaveClass("ui-table-scroll-x");
    expect(table.style.minWidth).toBe("900px");
    expect(table.style.color).toBe("red");
    expect(table.parentElement).toHaveClass("ui-table-wrapper-scroll-x");
  });

  it("bounds the wrapper height in scroll-y mode", () => {
    render(
      <TableRoot scroll={{ y: "50vh" }} aria-label="T">
        <tbody />
      </TableRoot>,
    );
    const wrapper = screen.getByRole("table").parentElement as HTMLElement;
    expect(wrapper).toHaveClass("ui-table-wrapper-scroll-y", "wrapperScrollY");
    expect(wrapper.style.maxHeight).toBe("50vh");
    expect(wrapper.style.overflowY).toBe("auto");
  });

  it("forwards refs through every compound part", () => {
    const refs = {
      table: createRef<HTMLTableElement>(),
      head: createRef<HTMLTableSectionElement>(),
      body: createRef<HTMLTableSectionElement>(),
      row: createRef<HTMLTableRowElement>(),
      header: createRef<HTMLTableCellElement>(),
      cell: createRef<HTMLTableCellElement>(),
    };
    render(
      <TableRoot ref={refs.table}>
        <TableHead ref={refs.head}>
          <TableRow>
            <TableHeader ref={refs.header} scope="col">
              H
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody ref={refs.body}>
          <TableRow ref={refs.row}>
            <TableCell ref={refs.cell} colSpan={2}>
              C
            </TableCell>
          </TableRow>
        </TableBody>
      </TableRoot>,
    );
    expect(refs.table.current?.tagName).toBe("TABLE");
    expect(refs.head.current?.tagName).toBe("THEAD");
    expect(refs.body.current?.tagName).toBe("TBODY");
    expect(refs.row.current?.tagName).toBe("TR");
    expect(refs.header.current).toBe(
      screen.getByRole("columnheader", { name: "H" }),
    );
    expect(refs.cell.current).toHaveAttribute("colspan", "2");
  });
});

describe("DataTable", () => {
  it("marks itself busy while loading and shows skeletons even if an error is set", () => {
    const { container } = render(
      <DataTable columns={bookColumns} data={books} loading error="Boom" />,
    );
    expect(container.firstElementChild).toHaveAttribute("aria-busy", "true");
    expect(container.firstElementChild).toHaveClass("ui-data-table");
    expect(screen.queryByRole("alert")).toBeNull();
    expect(
      container.querySelectorAll('tbody tr[aria-hidden="true"]'),
    ).toHaveLength(5);
  });

  it("is not busy when idle", () => {
    const { container } = render(
      <DataTable columns={bookColumns} data={books} />,
    );
    expect(container.firstElementChild).not.toHaveAttribute("aria-busy");
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("announces errors as an alert and offers a labelled retry", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <DataTable
        columns={bookColumns}
        data={books}
        error="Failed to load"
        onRetry={onRetry}
        retryLabel="Try again"
      />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Failed to load");
    expect(screen.queryByRole("table")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("uses the localized retry label by default", () => {
    render(
      <DataTable
        columns={bookColumns}
        data={books}
        error="Failed"
        onRetry={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("omits the retry action when no onRetry is provided", () => {
    render(<DataTable columns={bookColumns} data={books} error="Failed" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("keeps supplied server-page rows on page two and emits page changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <DataTable
        columns={[{ key: "name", header: "Name" }]}
        data={[{ name: "Page two row" }]}
        pagination={{ current: 2, pageSize: 10, total: 30, onChange }}
      />,
    );
    expect(container.querySelector("tbody")?.textContent).toContain(
      "Page two row",
    );
    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(onChange).toHaveBeenCalledWith(3, 10);
  });

  it("shows retry instead of stale rows and hides pagination on error", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    const { container } = render(
      <DataTable
        columns={[{ key: "name", header: "Name" }]}
        data={[{ name: "stale row" }]}
        error="Request failed"
        onRetry={onRetry}
        pagination={{ current: 1, pageSize: 10, total: 20, onChange: vi.fn() }}
      />,
    );
    expect(container.textContent).toContain("Request failed");
    expect(container.textContent).not.toContain("stale row");
    expect(container.querySelector("nav")).toBeNull();
    await user.click(screen.getByRole("button"));
    expect(onRetry).toHaveBeenCalledOnce();
  });
});

describe("TableCellContent", () => {
  it("flags secondary content and defaults maxWidth to 360px", () => {
    const { container, rerender } = render(
      <TableCellContent primary="Dune" secondary="Herbert" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("ui-table-cell-content", "cellContent");
    expect(root).toHaveAttribute("data-secondary", "true");
    expect(root.style.maxWidth).toBe("360px");
    rerender(<TableCellContent primary="Dune" />);
    expect(root).not.toHaveAttribute("data-secondary");
    expect(root.querySelector(".ui-table-cell-primary")?.tagName).toBe("DIV");
  });

  it("accepts string maxWidth, lets style override it and forwards attributes", () => {
    const { container, rerender } = render(
      <TableCellContent
        primary="x"
        maxWidth="20ch"
        className="consumer"
        title="full"
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.maxWidth).toBe("20ch");
    expect(root).toHaveClass("consumer");
    expect(root).toHaveAttribute("title", "full");
    rerender(
      <TableCellContent
        primary="x"
        maxWidth="20ch"
        style={{ maxWidth: "none" }}
      />,
    );
    expect(root.style.maxWidth).toBe("none");
  });

  it("renders bounded primary and secondary content, including zero values and semantic code", () => {
    const ref = createRef<HTMLDivElement>();
    const { container, rerender } = render(
      <TableCellContent ref={ref} primary={0} secondary={0} maxWidth={240} />,
    );
    expect(ref.current?.style.maxWidth).toBe("240px");
    expect(container.querySelector(".ui-table-cell-primary")?.textContent).toBe(
      "0",
    );
    expect(
      container.querySelector(".ui-table-cell-secondary")?.textContent,
    ).toBe("0");
    rerender(<TableCellContent primary={"<img src=x>"} monospace />);
    expect(container.querySelector("code")?.textContent).toBe("<img src=x>");
    expect(container.querySelector("code")).toHaveClass("cellMono");
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector(".ui-table-cell-secondary")).toBeNull();
  });
});

describe("Table styles", () => {
  const css = compile(join(import.meta.dirname, "table.module.scss")).css;

  it("does not disable table scrolling when borders are enabled", () => {
    expect(css).not.toMatch(/\.wrapperBordered\s*\{[^}]*overflow:\s*hidden/);
    expect(css).toMatch(/\.wrapper\s*\{[^}]*overflow-x:\s*auto/);
  });

  it("makes fixed columns sticky and the scroll-y header sticky", () => {
    expect(css).toMatch(
      /\.table th\[data-fixed\],\s*\.table td\[data-fixed\]\s*\{[^}]*position:\s*sticky/,
    );
    expect(css).toMatch(
      /\.wrapperScrollY \.table thead th\s*\{[^}]*position:\s*sticky[^}]*top:\s*0/,
    );
  });

  it("truncates ellipsis columns on a single line", () => {
    expect(css).toMatch(
      /td\[data-ellipsis=true\]\s*\{[^}]*white-space:\s*nowrap[^}]*text-overflow:\s*ellipsis/,
    );
  });
});
