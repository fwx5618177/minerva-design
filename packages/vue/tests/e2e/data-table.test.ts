// Browsing data: a sortable DataTable with row selection, paginated by
// Pagination (v-model:current), all through the Vue components.
import { describe, expect, it } from "vitest";
import { computed, defineComponent, h, ref } from "vue";
import { DataTable, Pagination, type TableSortState } from "../../src";
import { renderApp, settle } from "./utils";

interface User {
  id: number;
  name: string;
  age: number;
}
const USERS: User[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `User ${String(i + 1).padStart(2, "0")}`,
  age: 20 + ((i * 7) % 30),
}));

const Browser = defineComponent({
  setup() {
    const page = ref(1);
    const sort = ref<TableSortState | null>(null);
    const selected = ref<(string | number)[]>([]);
    const rows = computed(() => {
      const sorted = [...USERS];
      if (sort.value?.order) {
        const dir = sort.value.order === "ascend" ? 1 : -1;
        sorted.sort((a, b) => (a.age - b.age) * dir);
      }
      return sorted.slice((page.value - 1) * 5, page.value * 5);
    });
    return () => [
      h(DataTable as never, {
        columns: [
          { key: "name", header: "Name" },
          { key: "age", header: "Age", sortable: true },
        ],
        data: rows.value,
        rowKey: (row: User) => row.id,
        sortState: sort.value,
        "onUpdate:sortState": (s: TableSortState | null) => (sort.value = s),
        selectedRowKeys: selected.value,
        "onUpdate:selectedRowKeys": (k: (string | number)[]) =>
          (selected.value = k),
        "aria-label": "Users",
      }),
      h(Pagination, {
        total: USERS.length,
        pageSize: 5,
        current: page.value,
        "onUpdate:current": (p: number) => (page.value = p),
      }),
      h("output", { "data-testid": "selected" }, selected.value.join(",")),
    ];
  },
});

const names = () =>
  Array.from(document.querySelectorAll("tbody tr")).map(
    (row) =>
      row.querySelectorAll("td")[1]?.textContent?.trim() ?? row.textContent,
  );

describe("data table: sort, select, paginate", () => {
  it("sorts by a header, selects rows and pages through the data", async () => {
    const { user } = renderApp(() => h(Browser));
    await settle();
    expect(document.querySelectorAll("tbody tr")).toHaveLength(5);
    const ageHeader = Array.from(document.querySelectorAll("th")).find((th) =>
      th.textContent?.includes("Age"),
    )!;
    expect(ageHeader.getAttribute("aria-sort") ?? "none").toBe("none");
    await user.click(ageHeader.querySelector("button") ?? ageHeader);
    await settle();
    expect(ageHeader.getAttribute("aria-sort")).toBe("ascending");
    const ages = Array.from(document.querySelectorAll("tbody tr")).map((row) =>
      Number(Array.from(row.querySelectorAll("td")).at(-1)?.textContent),
    );
    expect(ages).toEqual([...ages].sort((a, b) => a - b));

    // select the first two rows
    const boxes = document.querySelectorAll<HTMLElement>(
      'tbody input[type="checkbox"], tbody [role="checkbox"]',
    );
    await user.click(boxes[0]);
    await user.click(boxes[1]);
    await settle();
    expect(
      document
        .querySelector('[data-testid="selected"]')!
        .textContent!.split(","),
    ).toHaveLength(2);
    expect(document.querySelectorAll("tbody tr[data-selected]")).toHaveLength(
      2,
    );

    // next page
    await user.click(
      document.querySelector<HTMLElement>('button[aria-label="Next page"]')!,
    );
    await settle();
    expect(document.querySelector('[aria-current="page"]')?.textContent).toBe(
      "2",
    );
    expect(document.querySelectorAll("tbody tr")).toHaveLength(5);
    expect(names()).not.toContain(undefined);
  });
});
