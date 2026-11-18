import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- TablePagination.vue -->

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

// The table does not slice \`rows\`: on \`minerva-page-change\` load the
// requested page (simulated server call, \`loading\` shows skeleton rows).

type Order = { id: number; item: string; amount: string };
type Column = { key: string; header: string; align?: "right" };
type Pagination = {
  current?: number;
  pageSize?: number;
  total?: number;
  showTotal?: boolean;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  pageSizeOptions?: number[];
};
type PageDetail = { page: number; pageSize: number };

const TOTAL = 42;
const ITEMS = ["Keyboard", "Monitor", "Headset", "Webcam", "Dock", "Mouse"];

const table = ref<
  HTMLElement & {
    columns: Column[];
    rows: Order[];
    loading: boolean;
    pagination: Pagination;
  }
>();

let timer: ReturnType<typeof setTimeout> | undefined;
const load = ({ page, pageSize }: PageDetail) => {
  table.value!.loading = true;
  clearTimeout(timer);
  timer = setTimeout(() => {
    const first = (page - 1) * pageSize + 1;
    const count = Math.max(0, Math.min(pageSize, TOTAL - first + 1));
    table.value!.rows = Array.from({ length: count }, (_, i) => ({
      id: first + i,
      item: ITEMS[(first + i) % ITEMS.length],
      amount: \`$\${((first + i) * 17.5).toFixed(2)}\`,
    }));
    table.value!.loading = false;
  }, 400);
};
const tableColumns = [
  { key: "id", header: "#" },
  { key: "item", header: "Item" },
  { key: "amount", header: "Amount", align: "right" },
];
const tablePagination = {
  current: 1,
  pageSize: 5,
  total: TOTAL,
  showTotal: true,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: [5, 10, 20],
};
const onPage = (event: Event) =>
  load((event as CustomEvent<PageDetail>).detail);

onMounted(() => {
  load({ page: 1, pageSize: 5 });
});

onBeforeUnmount(() => {
  clearTimeout(timer);
});
<\/script>

<template>
  <minerva-data-table
    id="orders"
    row-key="id"
    size="small"
    loading-rows="5"
    ref="table"
    :columns.prop="tableColumns"
    :pagination.prop="tablePagination"
    @minerva-page-change="onPage"
  ></minerva-data-table>
</template>
`,angular:`// table-pagination.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
  type OnDestroy,
} from "@angular/core";

// The table does not slice \`rows\`: on \`minerva-page-change\` load the
// requested page (simulated server call, \`loading\` shows skeleton rows).
type Order = { id: number; item: string; amount: string };
type Column = { key: string; header: string; align?: "right" };
type Pagination = {
  current?: number;
  pageSize?: number;
  total?: number;
  showTotal?: boolean;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  pageSizeOptions?: number[];
};
type PageDetail = { page: number; pageSize: number };

const TOTAL = 42;
const ITEMS = ["Keyboard", "Monitor", "Headset", "Webcam", "Dock", "Mouse"];

@Component({
  selector: "app-table-pagination",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-data-table
      id="orders"
      row-key="id"
      size="small"
      loading-rows="5"
      #table
      [columns]="tableColumns"
      [pagination]="tablePagination"
      (minerva-page-change)="onPage($event)"
    ></minerva-data-table>
  \`,
})
export class TablePaginationComponent implements AfterViewInit, OnDestroy {
  @ViewChild("table") table!: ElementRef<
    HTMLElement & {
      columns: Column[];
      rows: Order[];
      loading: boolean;
      pagination: Pagination;
    }
  >;

  timer: ReturnType<typeof setTimeout> | undefined;
  load = ({ page, pageSize }: PageDetail) => {
    this.table.nativeElement.loading = true;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const first = (page - 1) * pageSize + 1;
      const count = Math.max(0, Math.min(pageSize, TOTAL - first + 1));
      this.table.nativeElement.rows = Array.from({ length: count }, (_, i) => ({
        id: first + i,
        item: ITEMS[(first + i) % ITEMS.length],
        amount: \`$\${((first + i) * 17.5).toFixed(2)}\`,
      }));
      this.table.nativeElement.loading = false;
    }, 400);
  };
  tableColumns = [
    { key: "id", header: "#" },
    { key: "item", header: "Item" },
    { key: "amount", header: "Amount", align: "right" },
  ];
  tablePagination = {
    current: 1,
    pageSize: 5,
    total: TOTAL,
    showTotal: true,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: [5, 10, 20],
  };
  onPage = (event: Event) =>
    this.load((event as CustomEvent<PageDetail>).detail);

  ngAfterViewInit(): void {
    this.load({ page: 1, pageSize: 5 });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
`,svelte:`<!-- TablePagination.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // The table does not slice \`rows\`: on \`minerva-page-change\` load the
  // requested page (simulated server call, \`loading\` shows skeleton rows).

  type Order = { id: number; item: string; amount: string };
  type Column = { key: string; header: string; align?: "right" };
  type Pagination = {
    current?: number;
    pageSize?: number;
    total?: number;
    showTotal?: boolean;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    pageSizeOptions?: number[];
  };
  type PageDetail = { page: number; pageSize: number };

  const TOTAL = 42;
  const ITEMS = ["Keyboard", "Monitor", "Headset", "Webcam", "Dock", "Mouse"];

  let table: HTMLElement & {
    columns: Column[];
    rows: Order[];
    loading: boolean;
    pagination: Pagination;
  };

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
        amount: \`$\${((first + i) * 17.5).toFixed(2)}\`,
      }));
      table.loading = false;
    }, 400);
  };
  const tableColumns = [
    { key: "id", header: "#" },
    { key: "item", header: "Item" },
    { key: "amount", header: "Amount", align: "right" },
  ];
  const tablePagination = {
    current: 1,
    pageSize: 5,
    total: TOTAL,
    showTotal: true,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: [5, 10, 20],
  };
  const onPage = (event: Event) =>
    load((event as CustomEvent<PageDetail>).detail);

  onMount(() => {
    load({ page: 1, pageSize: 5 });
    return () => {
      clearTimeout(timer);
    };
  });
<\/script>

<minerva-data-table
  id="orders"
  row-key="id"
  size="small"
  loading-rows="5"
  bind:this={table}
  columns={tableColumns}
  pagination={tablePagination}
  onminerva-page-change={onPage}
></minerva-data-table>
`,solid:`// TablePagination.tsx

import { onCleanup, onMount } from "solid-js";

// The table does not slice \`rows\`: on \`minerva-page-change\` load the
// requested page (simulated server call, \`loading\` shows skeleton rows).
type Order = { id: number; item: string; amount: string };
type Column = { key: string; header: string; align?: "right" };
type Pagination = {
  current?: number;
  pageSize?: number;
  total?: number;
  showTotal?: boolean;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  pageSizeOptions?: number[];
};
type PageDetail = { page: number; pageSize: number };

const TOTAL = 42;
const ITEMS = ["Keyboard", "Monitor", "Headset", "Webcam", "Dock", "Mouse"];

export default function TablePagination() {
  let table!: HTMLElement & {
    columns: Column[];
    rows: Order[];
    loading: boolean;
    pagination: Pagination;
  };

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
        amount: \`$\${((first + i) * 17.5).toFixed(2)}\`,
      }));
      table.loading = false;
    }, 400);
  };
  const tableColumns = [
    { key: "id", header: "#" },
    { key: "item", header: "Item" },
    { key: "amount", header: "Amount", align: "right" },
  ];
  const tablePagination = {
    current: 1,
    pageSize: 5,
    total: TOTAL,
    showTotal: true,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: [5, 10, 20],
  };
  const onPage = (event: Event) =>
    load((event as CustomEvent<PageDetail>).detail);

  onMount(() => {
    load({ page: 1, pageSize: 5 });
  });

  onCleanup(() => {
    clearTimeout(timer);
  });

  return (
    <minerva-data-table
      id="orders"
      row-key="id"
      size="small"
      loading-rows="5"
      ref={table}
      prop:columns={tableColumns}
      prop:pagination={tablePagination}
      on:minerva-page-change={onPage}
    ></minerva-data-table>
  );
}
`,html:`<minerva-data-table
  id="orders"
  row-key="id"
  size="small"
  loading-rows="5"
></minerva-data-table>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // The table does not slice \`rows\`: on \`minerva-page-change\` load the
  // requested page (simulated server call, \`loading\` shows skeleton rows).
  const TOTAL = 42;
  const ITEMS = ["Keyboard", "Monitor", "Headset", "Webcam", "Dock", "Mouse"];

  const table = document.querySelector("#orders");
  let timer;
  const load = ({ page, pageSize }) => {
    table.loading = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      const first = (page - 1) * pageSize + 1;
      const count = Math.max(0, Math.min(pageSize, TOTAL - first + 1));
      table.rows = Array.from({ length: count }, (_, i) => ({
        id: first + i,
        item: ITEMS[(first + i) % ITEMS.length],
        amount: \`$\${((first + i) * 17.5).toFixed(2)}\`,
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
    showQuickJumper: true,
    pageSizeOptions: [5, 10, 20],
  };
  load({ page: 1, pageSize: 5 });
  const onPage = (event) => load(event.detail);
  table.addEventListener("minerva-page-change", onPage);
<\/script>
`}})))()}n();export{t as default};