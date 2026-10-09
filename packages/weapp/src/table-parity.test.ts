import simulate from "miniprogram-simulate";
import { afterEach, expect, it } from "vitest";
import { table, dataTable } from "./index";
const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => mounted.splice(0).forEach((w) => w.detach()));
function mount(c: typeof table, p: Record<string, unknown>) {
  const id = simulate.load({
    tagName: "table-case",
    template: c.template,
    ...c.definition,
  });
  const w = simulate.render(id, p);
  w.attach(document.createElement("div"));
  mounted.push(w);
  return w;
}
const tick = () => simulate.sleep(0);
it("Table computes fixed offsets, scroll extents, cell alignment and loading row count", () => {
  const w = mount(table, {
    columns: [
      { key: "id", header: "ID", fixed: "left", width: 80 },
      {
        key: "name",
        header: "Name",
        fixed: "left",
        width: 120,
        ellipsis: true,
      },
      { key: "action", header: "Actions", fixed: "right", width: 90 },
    ],
    data: [{ id: "a", name: "Ada" }],
    scroll: { x: 600, y: 240 },
    loadingRows: 3,
  });
  expect(w.data.viewColumns[1].style).toContain("left:80px");
  expect(w.data.viewColumns[2].style).toContain("right:0px");
  expect(w.data.tableStyle).toContain("600px");
  expect(w.data.scrollStyle).toContain("240px");
  w.setData({ loading: true });
  expect(w.querySelectorAll(".mn-table-skeleton-row")).toHaveLength(3);
});
it("Table configure renders native rich cells with exact row/key actions and custom comparators", async () => {
  const w = mount(table, {
    columns: [{ key: "score", header: "Score", sortable: true }],
    data: [
      { uuid: "a", score: 1 },
      { uuid: "b", score: 2 },
    ],
  });
  w.instance.configure({
    rowKey: (r: { uuid: string }) => r.uuid,
    comparators: {
      score: (a: { score: number }, b: { score: number }) => b.score - a.score,
    },
    cellRender: (row: { score: number }) => ({
      primary: `Score ${row.score}`,
      secondary: "Detail",
      action: "Inspect",
    }),
  });
  expect(w.dom!.textContent).toContain("Score 1");
  const action: unknown[] = [];
  w.addEventListener("cellaction", (e) => action.push(e.detail));
  w.querySelector(".mn-table-cell-action")!.dispatchEvent("tap");
  await tick();
  expect(action[0]).toMatchObject({
    key: "a",
    columnKey: "score",
    row: { uuid: "a", score: 1 },
  });
  w.querySelector(".mn-table-sort")!.dispatchEvent("tap");
  await tick();
  expect(w.data.rows.map((r: { key: string }) => r.key)).toEqual(["b", "a"]);
});
it("Table rowSelection supports defaults, callback disabled guards and controlled rejection", async () => {
  const w = mount(table, {
    columns: [{ key: "name", header: "Name" }],
    data: [
      { id: "a", name: "Ada" },
      { id: "b", name: "Bob" },
    ],
    rowSelection: { defaultSelectedRowKeys: ["a"] },
  });
  w.instance.configure({
    getCheckboxProps: (row: { id: string }) => ({ disabled: row.id === "b" }),
  });
  expect(w.data.rows[0].selected).toBe(true);
  expect(w.data.rows[1].disabled).toBe(true);
  w.querySelectorAll(".mn-select-row")[0].dispatchEvent("tap");
  await tick();
  expect(w.data.rows[0].selected).toBe(false);
  w.setData({ rowSelection: { selectedRowKeys: ["a"] } });
  w.querySelectorAll(".mn-select-row")[0].dispatchEvent("tap");
  await tick();
  expect(w.data.rows[0].selected).toBe(true);
});
it("DataTable forwards declarative pagination, quick jump, size choices, disabled and retry labels", async () => {
  const w = mount(dataTable, {
    columns: [{ key: "name", header: "Name" }],
    data: [{ id: 1, name: "One" }],
    pagination: {
      current: 2,
      pageSize: 10,
      total: 45,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: [5, 10],
      showTotal: true,
      labels: { next: "Forward" },
    },
    retryLabel: "Try again",
  });
  expect(w.data.activePage).toBe(2);
  expect(w.data.pageCount).toBe(5);
  expect(w.dom!.textContent).toContain("Forward");
  const pages: unknown[] = [];
  w.addEventListener("pagechange", (e) => pages.push(e.detail));
  w.querySelector(".mn-table-quick-jump")!.dispatchEvent("confirm", {
    detail: { value: "4" },
  });
  await tick();
  expect(pages).toEqual([{ current: 4, pageSize: 10 }]);
  expect(w.data.activePage).toBe(2);
  w.querySelector(".mn-table-page-size")!.dispatchEvent("change", {
    detail: { value: "0" },
  });
  await tick();
  expect(pages[1]).toEqual({ current: 1, pageSize: 5 });
  w.setData({ error: "Offline" });
  expect(w.dom!.textContent).toContain("Try again");
});
it("native custom cell components receive second-row data and return actions through the generic boundary", async () => {
  const renderer = simulate.load({
    tagName: "custom-score-cell",
    template:
      '<button class="custom-action" bindtap="act">{{row.name}}:{{value}}</button>',
    properties: {
      row: { type: Object, value: {} },
      value: { type: null, value: null },
    },
    methods: {
      act(this: WechatMiniprogram.Component.TrivialInstance) {
        this.triggerEvent("action", { operation: "inspect" });
      },
    },
  });
  const id = simulate.load({
    tagName: "custom-table",
    template: table.template,
    ...table.definition,
    usingComponents: { "cell-renderer": renderer },
  });
  const w = simulate.render(id, {
    customCellRenderer: true,
    columns: [
      { key: "name", header: "Name" },
      { key: "score", header: "Score" },
    ],
    data: [
      { id: "a", name: "Ada", score: 1 },
      { id: "b", name: "Bob", score: 2 },
    ],
  });
  w.attach(document.createElement("div"));
  mounted.push(w);
  const events: unknown[] = [];
  w.addEventListener("cellaction", (e) => events.push(e.detail));
  const cells = w.querySelectorAll(".mn-custom-cell");
  expect(cells).toHaveLength(4);
  expect(cells[3].dom!.textContent).toBe("Bob:2");
  cells[3].querySelector(".custom-action")!.dispatchEvent("tap");
  await tick();
  expect(events[0]).toMatchObject({
    key: "b",
    columnKey: "score",
    detail: { operation: "inspect" },
  });
});
