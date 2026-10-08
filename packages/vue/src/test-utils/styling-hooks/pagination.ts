import { h } from "vue";
import { Pagination } from "../../components/Pagination";
import type { HookScenario } from "./types";

export default [
  {
    name: "total, jumper, size changer",
    render: () =>
      h(Pagination, {
        total: 100,
        showTotal: true,
        showQuickJumper: true,
        showSizeChanger: true,
        size: "small",
        shape: "circle",
        variant: "outline",
      }),
  },
  {
    name: "simple, disabled",
    render: () => h(Pagination, { total: 50, simple: true, disabled: true }),
  },
] satisfies HookScenario[];
