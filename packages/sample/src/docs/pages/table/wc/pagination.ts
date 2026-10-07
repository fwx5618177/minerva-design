// The table does not slice `rows`: on `minerva-page-change` load the
// requested page (simulated server call, `loading` shows skeleton rows).
type Order = { id: number; item: string; amount: string };
type Column = { key: string; header: string; align?: "right" };
type Pagination = {
  current?: number;
  pageSize?: number;
  total?: number;
  showTotal?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
};
type PageDetail = { page: number; pageSize: number };

const TOTAL = 42;
const ITEMS = ["Keyboard", "Monitor", "Headset", "Webcam", "Dock", "Mouse"];

export function setup(root: HTMLElement) {
  const table = root.querySelector<
    HTMLElement & {
      columns: Column[];
      rows: Order[];
      loading: boolean;
      pagination: Pagination;
    }
  >("#orders")!;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const load = ({ page, pageSize }: PageDetail) => {
    table.loading = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      const first = (page - 1) * pageSize + 1;
      const count = Math.max(0, Math.min(pageSize, TOTAL - first + 1));
      table.rows = Array.from({ length: count }, (_, i) => ({
        id: first + i,
        item: ITEMS[(first + i) % ITEMS.length],
        amount: `$${((first + i) * 17.5).toFixed(2)}`,
      }));
      table.loading = false;
    }, 400);
  };
  table.columns = [
    { key: "id", header: "#" },
    { key: "item", header: "Item" },
    { key: "amount", header: "Amount", align: "right" },
  ];
  table.pagination = {
    current: 1,
    pageSize: 5,
    total: TOTAL,
    showTotal: true,
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20],
  };
  load({ page: 1, pageSize: 5 });
  const onPage = (event: Event) =>
    load((event as CustomEvent<PageDetail>).detail);
  table.addEventListener("minerva-page-change", onPage);
  return () => {
    clearTimeout(timer);
    table.removeEventListener("minerva-page-change", onPage);
  };
}
