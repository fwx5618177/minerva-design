import { TableCellContent } from "../../components/Table";
import type { HookScenario } from "./types";

export default [
  { name: "primary only", element: <TableCellContent primary="Ada" /> },
  {
    name: "monospace, secondary",
    element: <TableCellContent primary="a1b2" secondary="Commit" monospace />,
  },
] satisfies HookScenario[];
