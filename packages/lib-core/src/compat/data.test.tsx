import { createRef, type ReactNode } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  DataTable,
  HtmlPreview,
  NavTree,
  Tab,
  TabList,
  TabPanel,
  Table,
  TableBody,
  TableCell,
  TableCellContent,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
  Tabs,
  computeFixedColumnLayout,
  type DataTableProps,
  type FixedColumnLayout,
  type HtmlPreviewProps,
  type NavTreeItem,
  type NavTreeItemState,
  type NavTreeProps,
  type NavTreeSection,
  type TabListProps,
  type TabPanelProps,
  type TabProps,
  type TableCellContentProps,
  type TableColumn,
  type TableProps,
  type TableRootProps,
  type TableScrollConfig,
  type TableSize,
  type TableVariant,
  type TabsColorScheme,
  type TabsOrientation,
  type TabsProps,
  type TabsVariant,
} from "./data";

// Type-level: novel-isr-ui prop shapes are accepted as-is.
interface User {
  id: number;
  name: string;
  role: string;
}
const size: TableSize = "md";
const variant: TableVariant = "striped";
const scroll: TableScrollConfig = { x: 900, y: "50vh" };
const columns: TableColumn<User>[] = [
  { key: "name", header: "名字", width: 120, fixed: "left", ellipsis: true },
  { key: "role", header: "角色", align: "center" },
];
const tableProps: TableProps<User> = {
  columns,
  data: [{ id: 1, name: "Alice", role: "admin" }],
  rowKey: (row) => row.id,
  size,
  variant,
  hoverable: true,
  emptyText: "暂无用户",
};
const rootProps: TableRootProps = { size: "sm", variant: "bordered", scroll };
const dataTableProps: DataTableProps<User> = {
  ...tableProps,
  error: "Request failed",
  onRetry: () => {},
  retryLabel: "重试",
  pagination: {
    page: 2,
    pageSize: 10,
    total: 30,
    onPageChange: () => {},
    siblingCount: 1,
    boundaryCount: 1,
    pageSizeOptions: [10, 20],
    onPageSizeChange: () => {},
    pageSizeLabel: "条 / 页",
    showTotal: true,
  },
};
const cellProps: TableCellContentProps = { primary: "x", monospace: true };
const layout: FixedColumnLayout = computeFixedColumnLayout(columns);
const navItem: NavTreeItem = { id: "a", label: "A", href: "/a" };
const navSections: NavTreeSection[] = [{ id: "s", items: [navItem] }];
const navProps: NavTreeProps = {
  "aria-label": "后台主导航",
  sections: navSections,
  defaultExpandedIds: [],
};
const tabsVariant: TabsVariant = "pills";
const tabsScheme: TabsColorScheme = "gray";
const orientation: TabsOrientation = "vertical";
const tabsProps: TabsProps = {
  defaultValue: "a",
  variant: tabsVariant,
  colorScheme: tabsScheme,
  orientation,
  activationMode: "manual",
  onValueChange: () => {},
};
const tabProps: TabProps = {
  value: "a",
  colorScheme: "success",
  children: "A",
};
const tabListProps: TabListProps = { "aria-label": "Tabs" };
const tabPanelProps: TabPanelProps = { value: "a" };
const htmlProps: HtmlPreviewProps = {
  html: "<p>x</p>",
  title: "Email",
  viewport: "mobile",
  mobileWidth: 390,
  height: 500,
};
void [rootProps, dataTableProps, cellProps, layout, navProps, tabsProps];
void [tabProps, tabListProps, tabPanelProps, htmlProps];

const books = [
  { id: 1, title: "Dune" },
  { id: 2, title: "Solaris" },
];

describe("compat: Table", () => {
  it("maps novel sizes and keeps the ui-* hooks", () => {
    const { rerender } = render(
      <Table
        columns={[{ key: "title", header: "Title" }]}
        data={books}
        rowKey={(row) => row.id}
        size="md"
        variant="striped"
        aria-label="Books"
      />,
    );
    const table = screen.getByRole("table", { name: "Books" });
    expect(table).toHaveClass(
      "ui-table",
      "ui-table-size-md",
      "ui-table-variant-striped",
      "medium",
    );
    expect(table.parentElement).toHaveClass("ui-table-wrapper");
    rerender(
      <Table
        columns={[{ key: "title", header: "Title" }]}
        data={books}
        size="sm"
        aria-label="Books"
      />,
    );
    expect(table).toHaveClass("ui-table-size-sm", "small");
    rerender(
      <Table
        columns={[{ key: "title", header: "Title" }]}
        data={books}
        size="lg"
      />,
    );
    expect(screen.getByRole("table")).toHaveClass("ui-table-size-lg", "large");
    rerender(
      <Table columns={[{ key: "title", header: "Title" }]} data={books} />,
    );
    expect(screen.getByRole("table")).toHaveClass("ui-table-size-md");
  });

  it("shows novel's default Chinese empty text, loading rows and custom empty text", () => {
    const { rerender, container } = render(
      <Table columns={[{ key: "title", header: "Title" }]} data={[]} />,
    );
    expect(screen.getByRole("cell", { name: "暂无数据" })).toHaveClass(
      "ui-table-empty",
    );
    rerender(
      <Table
        columns={[{ key: "title", header: "Title" }]}
        data={[]}
        loading
        loadingRows={3}
      />,
    );
    expect(
      container.querySelectorAll('tbody tr[aria-hidden="true"]'),
    ).toHaveLength(3);
    rerender(
      <Table
        columns={[{ key: "title", header: "Title" }]}
        data={[]}
        emptyText="暂无用户"
      />,
    );
    expect(screen.getByText("暂无用户")).toBeInTheDocument();
  });

  it("renders compound parts with novel sizes and scroll", () => {
    const ref = createRef<HTMLTableElement>();
    render(
      <TableRoot ref={ref} size="sm" variant="bordered" scroll={{ x: 900 }}>
        <TableHead>
          <TableRow>
            <TableHeader scope="col">H</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TableCellContent primary="Dune" secondary="Herbert" />
            </TableCell>
          </TableRow>
        </TableBody>
      </TableRoot>,
    );
    expect(ref.current).toHaveClass(
      "ui-table-size-sm",
      "ui-table-scroll-x",
      "ui-table-variant-bordered",
    );
    expect(ref.current?.parentElement).toHaveClass("ui-table-wrapper-scroll-x");
    expect(
      document.querySelector(".ui-table-cell-secondary")?.textContent,
    ).toBe("Herbert");
  });

  it("computes fixed column offsets", () => {
    expect(layout.leftOffsets).toEqual({ name: 0 });
  });
});

describe("compat: DataTable", () => {
  it("keeps supplied server-page rows on page two and emits page changes", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    const { container } = render(
      <DataTable
        columns={[{ key: "name", header: "Name" }]}
        data={[{ name: "Page two row" }]}
        pagination={{ page: 2, pageSize: 10, total: 30, onPageChange }}
      />,
    );
    expect(container.querySelector("tbody")?.textContent).toContain(
      "Page two row",
    );
    expect(container.firstElementChild).toHaveClass("ui-data-table");
    await user.click(screen.getByRole("button", { name: "下一页" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("maps the page size selector and total", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();
    render(
      <DataTable
        columns={[{ key: "name", header: "Name" }]}
        data={[{ name: "Row" }]}
        size="sm"
        pagination={{
          page: 1,
          pageSize: 10,
          total: 30,
          onPageChange,
          pageSizeOptions: [10, 20],
          onPageSizeChange,
          showTotal: (total, range) => `${range[0]}-${range[1]} / ${total}`,
        }}
      />,
    );
    expect(screen.getByText("1-10 / 30")).toBeInTheDocument();
    // novel's Select popup: focus the combobox, Enter, click the option
    const sizeSelect = screen.getByRole("combobox", { name: "每页显示条数" });
    sizeSelect.focus();
    await user.keyboard("{Enter}");
    await user.click(await screen.findByRole("option", { name: "20 条 / 页" }));
    expect(onPageSizeChange).toHaveBeenCalledWith(20);
    expect(onPageChange).not.toHaveBeenCalled();
    expect(screen.getByRole("table")).toHaveClass("ui-table-size-sm");
  });

  it("passes every novel pagination option through (no silently ignored props)", () => {
    const { container, rerender } = render(
      <DataTable
        columns={[{ key: "name", header: "Name" }]}
        data={[{ name: "Row" }]}
        pagination={{
          page: 10,
          pageSize: 10,
          total: 200,
          onPageChange: vi.fn(),
          siblingCount: 0,
          boundaryCount: 1,
          pageSizeOptions: [10, 50],
          onPageSizeChange: vi.fn(),
          pageSizeLabel: "rows",
        }}
      />,
    );
    // compact list: first, current, last (+ ellipses) with siblingCount 0
    for (const page of ["1", "10", "20"]) {
      expect(screen.getByRole("button", { name: page })).toBeInTheDocument();
    }
    expect(screen.queryByRole("button", { name: "9" })).toBeNull();
    // the Select trigger shows the current size with pageSizeLabel
    expect(
      screen.getByRole("combobox", { name: "每页显示条数" }),
    ).toHaveTextContent("10 rows");

    rerender(
      <DataTable
        columns={[{ key: "name", header: "Name" }]}
        data={[{ name: "Row" }]}
        pagination={{
          page: 2,
          pageSize: 10,
          total: 30,
          onPageChange: vi.fn(),
          hideEdges: true,
          hideNumbers: true,
        }}
      />,
    );
    expect(screen.queryByRole("button", { name: "下一页" })).toBeNull();
    expect(screen.queryByRole("button", { name: "2" })).toBeNull();
    expect(container.textContent).toContain("2 / 3");
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
        pagination={{ page: 1, pageSize: 10, total: 20, onPageChange: vi.fn() }}
      />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Request failed");
    expect(container.textContent).not.toContain("stale row");
    expect(container.querySelector("nav")).toBeNull();
    await user.click(screen.getByRole("button", { name: "重试" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });
});

describe("compat: NavTree", () => {
  const renderNavLink = (
    item: NavTreeItem,
    content: ReactNode,
    state: NavTreeItemState,
  ) =>
    item.href ? (
      <a
        key={item.id}
        href={item.href}
        title={
          item.description ? `${item.label} / ${item.description}` : item.label
        }
        className={state.className}
        aria-current={state.active ? "page" : undefined}
      >
        {content}
      </a>
    ) : (
      content
    );

  const sections: NavTreeSection[] = [
    {
      id: "main",
      title: "运营",
      items: [
        { id: "dashboard", label: "仪表盘", href: "/", icon: <svg /> },
        {
          id: "ops",
          label: "运营中心",
          children: [
            { id: "analytics", label: "访问统计", href: "/analytics" },
          ],
        },
      ],
    },
  ];

  it("renders admin-dashboard's usage with the ui-* hooks", () => {
    render(
      <NavTree
        aria-label="后台主导航"
        sections={sections}
        activeId="analytics"
        collapsed={false}
        defaultExpandedIds={["ops"]}
        renderLink={renderNavLink}
      />,
    );
    const nav = screen.getByRole("navigation", { name: "后台主导航" });
    expect(nav).toHaveClass("ui-nav-tree");
    expect(nav.querySelector(".ui-nav-tree-section")).not.toBeNull();
    expect(nav.querySelector(".ui-nav-tree-section-title")?.textContent).toBe(
      "运营",
    );
    expect(nav.querySelectorAll(".ui-nav-tree-icon").length).toBeGreaterThan(0);
    const children = nav.querySelector(".ui-nav-tree-children")!;
    const active = within(children as HTMLElement).getByRole("link", {
      name: "访问统计",
    });
    expect(active).toHaveClass("ui-nav-tree-item", "ui-nav-tree-item-active");
  });

  it("keeps novel's English default landmark name", () => {
    render(<NavTree sections={sections} collapsed />);
    expect(screen.getByRole("navigation", { name: "Navigation" })).toHaveClass(
      "ui-nav-tree-collapsed",
    );
  });
});

describe("compat: Tabs", () => {
  it("renders novel-rating's usages with the ui-* hooks", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { container } = render(
      <Tabs
        defaultValue="profile"
        variant="line"
        orientation="vertical"
        onValueChange={onValueChange}
      >
        <TabList>
          <Tab value="profile">资料</Tab>
          <Tab value="security">安全</Tab>
        </TabList>
        <TabPanel value="profile">Profile</TabPanel>
        <TabPanel value="security">Security</TabPanel>
      </Tabs>,
    );
    const root = container.firstElementChild!;
    expect(root).toHaveClass(
      "ui-tabs",
      "ui-tabs-variant-line",
      "ui-tabs-color-brand",
      "ui-tabs-orientation-vertical",
    );
    expect(root.querySelector(".ui-tabs-list")).not.toBeNull();
    await user.click(screen.getByRole("tab", { name: "安全" }));
    expect(onValueChange).toHaveBeenCalledWith("security");
    expect(screen.getByRole("tab", { name: "安全" })).toHaveClass(
      "ui-tabs-trigger",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Security");
  });

  it("maps colorScheme on the group and on tabs", () => {
    render(
      <Tabs
        variant="soft"
        colorScheme="gray"
        value="en"
        activationMode="manual"
      >
        <TabList aria-label="Languages">
          <Tab value="en" colorScheme="brand">
            English
          </Tab>
          <Tab value="ja" colorScheme="success">
            Japanese
          </Tab>
          <Tab value="de">German</Tab>
        </TabList>
      </Tabs>,
    );
    const [en, ja, de] = screen.getAllByRole("tab");
    expect(screen.getByRole("tablist").parentElement).toHaveClass(
      "ui-tabs-color-gray",
      "neutral",
    );
    expect(en).toHaveClass("ui-tabs-color-brand", "primary");
    expect(ja).toHaveClass("ui-tabs-color-success", "success");
    expect(de.className).not.toContain("ui-tabs-color-");
    expect(en.hasAttribute("colorScheme")).toBe(false);
  });
});

describe("compat: HtmlPreview", () => {
  it("renders a sandboxed preview with the ui-* hooks", () => {
    const { container } = render(<HtmlPreview {...htmlProps} />);
    expect(container.firstElementChild).toHaveClass("ui-html-preview");
    const frame = container.querySelector("iframe")!;
    expect(frame).toHaveClass("ui-html-preview-frame");
    expect(frame.getAttribute("sandbox")).toBe("");
    expect(frame.style.width).toBe("390px");
  });
});
