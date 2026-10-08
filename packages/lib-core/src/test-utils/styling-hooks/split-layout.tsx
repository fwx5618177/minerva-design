import { SplitLayout } from "../../components/SplitLayout";
import type { HookScenario } from "./types";

export default [
  {
    name: "with aside",
    element: <SplitLayout aside="Aside">Main</SplitLayout>,
  },
  {
    name: "without aside",
    element: <SplitLayout aside={null}>Main</SplitLayout>,
  },
] satisfies HookScenario[];
