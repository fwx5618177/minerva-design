import { Pagination } from "../../components/Pagination";
import type { HookScenario } from "./types";

export default [
  {
    name: "total, jumper, size changer",
    element: (
      <Pagination
        total={100}
        showTotal
        showQuickJumper
        showSizeChanger
        size="small"
        shape="circle"
        variant="outline"
      />
    ),
  },
  {
    name: "simple, disabled",
    element: <Pagination total={50} simple disabled />,
  },
] satisfies HookScenario[];
